import React from 'react'
import { Isolicitud } from '../../Interfaces/Isolicitud';
import { collection,query, where, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../Services/firebase';
import { changeDate } from '../../Services/util';
import DataTable from "../../components/DataTable";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogAdm from '../../components/DialogAdm';
import { getStorage, ref, deleteObject } from "firebase/storage";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SolicitudesService from '../../Services/sSolicitudes';


type Props = {
  columns: Column[]
  elementos: string,
  opcion:number
}

export default function Imagenes({columns, elementos, opcion}:Props) 
{
    const [fechaInicial, setFechaInicial] = React.useState<string>(new Date().toISOString().split('T')[0])
    const [fechaFinal, setFechaFinal] = React.useState<string>(new Date().toISOString().split('T')[0])
    const [openD, setOpenD] = React.useState<boolean>(false)
    const [openB, setOpenB] = React.useState<boolean>(false)
    const [data, setData] = React.useState<Isolicitud[]>([]);
    const db = collection(firestore, 'solicitudes');
    const storage = getStorage();
    const iQuery =  query(db, 
        where('estado',"==","ENTREGADO"), 
        where('creado',">=",new Date(fechaInicial)),
        where('creado',"<=",new Date(fechaFinal)), 
        orderBy('creado','asc'))
    
  
    React.useEffect(()=>{
      const getData = async()=>{
        const d = await getDocs(iQuery);
        
        setData(d.docs.map((item)=>{
          return { ...item.data(), id:item.id, creado:changeDate(item.data().creado) } as Isolicitud
      }));
      }
      getData()
    },[fechaFinal,fechaInicial])

    const handleDelete = () =>{
      setOpenB(true)
      setOpenD(false)

      switch (opcion) {
        case 0:
          data.forEach(item=>{
            deleteImagen(item.voucher as string, item.id as string)
          })
        break;
        case 1:
          data.forEach(item=>{
            deleteImagen(item.certificado_trabajo as string, item.id as string)
          })
        break;
        case 2:
          data.forEach(item=>{
            borrarItem(item.id as string)
          })
        break;
      }
      setOpenB(false)
    }
    const deleteImagen = (url:string, id:string) =>{
      // Create a reference to the file to delete
      const desertRef = ref(storage, url);
      deleteObject(desertRef).then(() => {
        SolicitudesService.updateImagen(id)
        console.log(url, 'eliminada');
      }).catch((error) => {
        console.log(error);
      });
    }
    const borrarItem = (id:string) =>{
      SolicitudesService.deleteItem(id)
    }
    
    return (
      <React.Fragment>
        <Grid container spacing={4} sx={{mt:2}}>
            <Grid item xs={12} sm={4}>
              <TextField
                type='date'
                sx={{mb:2, width:'95%'}}
                required
                disabled={false}
                error={false}
                value={fechaInicial}
                onChange={(e)=>setFechaInicial(e.target.value)}
                name="fecha"
                label="Fecha Inicial"
                helperText={false && "Ingrese la fecha válida"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                  type='date'
                  sx={{mb:2, width:'95%'}}
                  required
                  disabled={false}
                  error={false}
                  value={fechaFinal}
                  onChange={(e)=>setFechaFinal(e.target.value)}
                  name="fecha"
                  label="Fecha Final"
                  helperText={false && "Ingrese la fecha válida"}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                onClick={()=>setOpenD(true)} 
                sx={{p:1.5}} 
                disabled={data.length <= 0}
                fullWidth
                color='error' 
                variant="outlined" 
                startIcon={<DeleteIcon />}>
                  Eliminar Imágenes
              </Button>
            </Grid>
          </Grid>
          <DataTable columns={columns} rows={data} action={false} />
          <DialogAdm 
            title='Eliminar imágenes' 
            content={`Desea eliminar las ${elementos} contenidas desde la fecha: ${fechaInicial} hasta la fecha: ${fechaFinal}`}
            open={openD}
            setOpen={setOpenD}
            actionFunc={handleDelete}/>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openB}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      </React.Fragment>
    )
}
