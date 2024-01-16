import React from "react";
import { firestore } from '../Services/firebase';
import { collection, onSnapshot,orderBy,query, where } from 'firebase/firestore';
import { Isolicitud } from "../Interfaces/Isolicitud";
import DataTable from "../components/DataTable";
import { useSearchParams } from "react-router-dom";
import DialogAdm from "../components/Dialogs/DialogAdm";
import { Typography } from "@mui/material";
import SolicitudesService from "../Services/sSolicitudes";
import { changeDate } from "../Services/util";
import DialogFull from "../components/Dialogs/DialogFull";
import { Icurso } from "../Interfaces/Icurso";
import Icertificado from "../Interfaces/Icertificado";
import Ifacultad from "../Interfaces/Ifacultad";

const columns: Column[] = [
  { id: 'solicitud', label: 'Solicitud', minWidth: 70, align: 'left' },
  { id: 'creado', label: 'Fecha', minWidth: 40},
  { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
  { id: 'nombres', label: 'Nombres', minWidth: 120 },
  { id: 'idioma', label: 'Idioma', minWidth: 25, align: 'left' },
  { id: 'nivel', label: 'Nivel', minWidth: 25, align: 'left' },
  
];

type Props = {
  cursos:Icurso[],
  certificados:Icertificado[],
  facultades:Ifacultad[]
}

export default function Certificados({cursos, certificados, facultades}:Props) 
{
  //router
  const [searchParams] = useSearchParams()
  
  //dialog
  const [ID, setID] = React.useState<string| undefined>('');
  const [openDialogD, setOpenDialogD] = React.useState<boolean>(false);
  const [openDialogF, setOpenDialogF] = React.useState<boolean>(false);
  //navigation
  //const navigate = useNavigate()
  //data y bd
  const [data, setData] = React.useState<Isolicitud[]>([]);
  const db = collection(firestore, 'solicitudes');
  const itemQuery =  query(db, where('estado',"==",searchParams.get('estado')),orderBy('creado','asc'))

  React.useEffect(()=>{
    onSnapshot(itemQuery, (data)=>{
      setData(data.docs.map((item)=>{
        return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true)  } as Isolicitud
      }));
    });
  },[searchParams]);

  const handleDelete = (id:string | undefined) =>{
    setID(id)
    setOpenDialogD(true)
  }
  const handleEdit = (id:string | undefined) =>{
      setOpenDialogF(true)
      setID(id)
      //navigate(`/solicitudes/${id}`)
  }
  const deleteFunc = () => {
    SolicitudesService.deleteItem(ID)
    setOpenDialogD(false)
  }

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>{searchParams.get('estado')}</Typography>
      {data && <DataTable 
            rows={data} 
            columns={columns} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            size='small'
            origen={true}
            action={true}/>
      }
      <DialogFull 
          open={openDialogF} 
          setOpen={setOpenDialogF}
          title="Detalle de Solicitud"
          id={ID}
          certificados={certificados}
          cursos={cursos}
          facultades={facultades}
      />
      <DialogAdm 
          title='Borrar Registro' 
          content="Confirma borrar el registro?"
          open={openDialogD} 
          setOpen={setOpenDialogD} 
          actionFunc={deleteFunc}/>
    </React.Fragment>
  )
}
