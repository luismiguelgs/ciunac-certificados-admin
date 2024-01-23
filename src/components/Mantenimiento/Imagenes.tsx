import React from 'react'
import { Isolicitud } from '../../Interfaces/Isolicitud';
import DataTable from "../MUI/DataTable";
import { TextField, Button, Grid, Backdrop, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DialogAdm from '../Dialogs/DialogAdm';
import SolicitudesService from '../../Services/sSolicitudes';
import StorageService from '../../Services/StorageService';

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
    
    React.useEffect(()=>{
      SolicitudesService.fetchItemQueryDate(setData,fechaInicial,fechaFinal,true)
    },[fechaFinal,fechaInicial])

    const handleDelete = () =>{
      setOpenB(true)
      setOpenD(false)

      switch (opcion) {
        case 0:
          data.forEach(item=>{
            StorageService.deleteImagen(item.voucher as string, item.id as string)
          })
        break;
        case 1:
          data.forEach(item=>{
            StorageService.deleteImagen(item.certificado_trabajo as string, item.id as string)
          })
        break;
        case 2:
          data.forEach(item=>{
            SolicitudesService.deleteItem(item.id as string)
          })
        break;
      }
      setOpenB(false)
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
                  Eliminar
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
