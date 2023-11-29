import { useState,useEffect } from "react";
import { firestore } from '../../Services/firebase';
import { collection, onSnapshot,query, where } from 'firebase/firestore';
import { Isolicitud } from "../../Interfaces/Isolicitud";
import DataTable from "../DataTable";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DialogAdm from "../DialogAdm";
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SolicitudesService from "../../Services/sSolicitudes";

const columns: Column[] = [
  { id: 'solicitud', label: 'Solicitud', minWidth: 120 },
  { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
  { id: 'nombres', label: 'Nombres', minWidth: 80, align: 'right' },
  { id: 'idioma', label: 'Idioma', minWidth: 40, align: 'right' },
  { id: 'nivel', label: 'Nivel', minWidth: 40, align: 'right' },
];

export default function Solicitudes()
{
    //dialog
    const [ID, setID] = useState<string| undefined>('');
    const [openD, setOpenD] = useState<boolean>(false);
    //navigation
    const navigate = useNavigate()
    //data y bd
    const [data, setData] = useState<Isolicitud[]>([]);
    const db = collection(firestore, 'solicitudes');

    //busqueda
    const [busqueda, setBusqueda] = useState<string>('')

    useEffect(()=>{
        if(busqueda === ''){
          onSnapshot(db, (data)=>{
            setData(data.docs.map((item)=>{
              return { ...item.data(), id:item.id  } as Isolicitud
            }));
          });
        }
        else{
          const itemQuery =  query(db, where('apellidos',">=",busqueda))
          onSnapshot(itemQuery, (data)=>{
            setData(data.docs.map((item)=>{
              return { ...item.data(), id:item.id  } as Isolicitud
            }));
          });
        }
    },[busqueda]);

    const handleDelete = (id:string | undefined) =>{
      setID(id)
      setOpenD(true)
    }
    const handleEdit = (id:string | undefined) =>{
        navigate(`/solicitudes/${id}`)
    }
    const deleteFunc = () => {
      SolicitudesService.deleteItem(ID)
      setOpenD(false)
    }
    const handleNew = () =>{
      navigate(`/solicitud-nueva`)
    }

    return(
        <>
          <Grid container spacing={2} sx={{mb:1}}>
            <Grid item xs={12} sm={6}>
            <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNew} size="large">
                Nueva Solicitud
            </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                      required
                      name='buscar'
                      value={busqueda}
                      onChange={(e)=>setBusqueda(e.target.value)}
                      label="Buscar"
                      InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  <SearchIcon />
                              </InputAdornment>
                          ),
                      }}
                      variant="outlined"
                      helperText={false && "Campo requerido, ingresar un email válido"}
                  />
            </Grid>
          </Grid>
            <DataTable 
              rows={data} 
              columns={columns} 
              handleDelete={handleDelete} 
              handleEdit={handleEdit} 
              action={true}/>
            <DialogAdm 
              title='Borrar Registro' 
              content="Confirma borrar el registro?"
              open={openD} 
              setOpen={setOpenD} 
              actionFunc={deleteFunc}/>
        </>
    )
}