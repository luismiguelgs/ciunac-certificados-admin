import React from "react";
import { firestore } from '../Services/firebase';
import { collection, onSnapshot,query, where } from 'firebase/firestore';
import { Isolicitud } from "../Interfaces/Isolicitud";
import DataTable from "../components/DataTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import DialogAdm from "../components/DialogAdm";
import { Typography } from "@mui/material";
import SolicitudesService from "../Services/sSolicitudes";


const columns: Column[] = [
  { id: 'solicitud', label: 'Solicitud', minWidth: 80, align: 'left' },
  { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
  { id: 'nombres', label: 'Nombres', minWidth: 120 },
  { id: 'idioma', label: 'Idioma', minWidth: 25, align: 'left' },
  { id: 'nivel', label: 'Nivel', minWidth: 25, align: 'left' },
  
];

export default function Certificados() 
{
  //router
  const [searchParams] = useSearchParams()
  
  //dialog
  const [ID, setID] = React.useState<string| undefined>('');
  const [openD, setOpenD] = React.useState<boolean>(false);
  //navigation
  const navigate = useNavigate()
  //data y bd
  const [data, setData] = React.useState<Isolicitud[]>([]);
  const db = collection(firestore, 'solicitudes');
  const itemQuery =  query(db, where('estado',"==",searchParams.get('estado')))

  React.useEffect(()=>{
    onSnapshot(itemQuery, (data)=>{
      setData(data.docs.map((item)=>{
        return { ...item.data(), id:item.id  } as Isolicitud
      }));
    });
  },[searchParams]);

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

  return (
    <React.Fragment>
      <Typography>{searchParams.get('estado')}</Typography>
      {data && <DataTable 
            rows={data} 
            columns={columns} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            action={true}/>
      }
      <DialogAdm 
            title='Borrar Registro' 
            content="Confirma borrar el registro?"
            open={openD} 
            setOpen={setOpenD} 
            actionFunc={deleteFunc}/>
    </React.Fragment>
  )
}
