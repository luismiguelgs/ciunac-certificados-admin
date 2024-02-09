import React from "react";
import { Isolicitud } from "../Interfaces/Isolicitud";
import DataTable, { Column } from "../components/MUI/DataTable";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import SolicitudesService from "../Services/sSolicitudes";
import DialogFull from "../components/Dialogs/DialogFull";
import Buscador from "../components/Buscador";
import MyDialog from "../components/MUI/MyDialog";

const columns: Column[] = [
  { id: 'solicitud', label: 'Solicitud', minWidth: 70, align: 'left' },
  { id: 'creado', label: 'Fecha', minWidth: 40},
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
    const [openDialogD, setOpenDialogD] = React.useState<boolean>(false);
    const [openDialogF, setOpenDialogF] = React.useState<boolean>(false);

    //data y bd
    const [data, setData] = React.useState<Isolicitud[]>([]);
    const [dataTemp, setDataTemp] = React.useState<Isolicitud[]>([]);
    
    React.useEffect(()=>{
        SolicitudesService.fetchItemQuery(setData, searchParams.get('estado'))
    },[searchParams.get('estado')]);

    React.useEffect(() => {
        // Este efecto se ejecutará cuando 'data' cambie
        setDataTemp(data);
    }, [data]);

    const handleDelete = (id:string | undefined) =>{
        setID(id)
        setOpenDialogD(true)
    }
    const handleEdit = (id:string | undefined) =>{
        setOpenDialogF(true)
        setID(id)
    }
    const deleteFunc = () => {
        SolicitudesService.deleteItem(ID)
        setOpenDialogD(false)
    }

    return (
        <React.Fragment>
        {
            searchParams.get('estado') === 'NUEVO' ? (<Typography variant="h4" gutterBottom>SOLICITUDES NUEVAS</Typography>) :
            searchParams.get('estado') === 'ELABORADO' ? (<Typography variant="h4" gutterBottom>SOLICITUDES ELABORADAS</Typography>) :
            (<Typography variant="h4" gutterBottom>SOLICITUDES ENTREGADAS</Typography>) 
        }
        <Buscador  data={dataTemp} setData={setDataTemp} aux={data}/>
        {dataTemp && <DataTable 
                rows={dataTemp} 
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
        />
        <MyDialog
            type="ALERT"
            title="Borrar Registro"
            open={openDialogD}
            content='Confirma borrar el registro?'
            setOpen={setOpenDialogD}
            actionFunc={deleteFunc}
        />
        </React.Fragment>
    )
}
