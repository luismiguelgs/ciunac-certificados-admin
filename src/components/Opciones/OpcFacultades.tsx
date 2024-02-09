import React from 'react'
import DataTable, { Column } from '../MUI/DataTable';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import FacultadesService from '../../Services/sFacultades';
import { Ifacultad } from '../../Interfaces/Types';
import { useStateContext } from '../../contexts/ContextProvider';
import MyDialog from '../MUI/MyDialog';
import FormDialog from './FormDialog';

const columns: Column[] = [
    { id: 'value', label: 'Valor', minWidth: 80 },
    { id: 'label', label: 'Etiqueta', minWidth: 100 },
  ];

export default function OpcFacultades() 
{
    const {facultades} = useStateContext()

    //data y bd
    const [item, setItem] = React.useState<Ifacultad>({value:'', label:''});

    //dialog
    const [ID, setID] = React.useState<string| undefined>('');
    const [openD, setOpenD] = React.useState<boolean>(false);

    //dialog form
    const [openDF, setOpenDF] = React.useState(false);

    //functions
    const handleDelete = (id:string | undefined) =>{
        setID(id)
        setOpenD(true)
    }
    const handleEdit = (id:string | undefined) =>{
        setItem(facultades.filter(d=>id===d.id)[0])
        setID(id)
        setOpenDF(true)
    }
    const handleNew = () =>{
        setID('')
        setOpenDF(true)
        setItem({value:'', label:''})
    }
    const handleSave = () =>{
        if(ID===''){
            FacultadesService.newItem(item)
            setOpenDF(false)
        }else{
            FacultadesService.updateItem(item)
            setOpenDF(false)
        }
    }
    const deleteFunc = () => {
        FacultadesService.deleteItem(ID)
        setOpenD(false)
    }
    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNew}>
                Nueva Facultad
            </Button>
            <DataTable 
                rows={facultades} 
                columns={columns} 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
                action={true}/>
            <MyDialog 
                type='ALERT'
                title='Borrar Registro'
                content="Confirma borrar el registro?"
                open={openD}
                setOpen={setOpenD}
                actionFunc={deleteFunc} /> 
            <MyDialog
                type='FORM'
                title={ID === '' ? 'Nuevo Item' : 'Editar Item'}
                open={openDF}
                setOpen={setOpenDF}
                content={<FormDialog item={item} setItem={setItem} opt={ID === '' ? 'NUEVO' : 'EDITAR'} />}
                actionFunc={handleSave} />
        </React.Fragment>
    )
}
