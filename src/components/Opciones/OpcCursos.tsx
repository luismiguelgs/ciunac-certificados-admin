import React from 'react'
import { Icurso } from '../../Interfaces/Types'
import DataTable, { Column } from '../MUI/DataTable'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CursosService from '../../Services/sCursos';
import { useStateContext } from '../../contexts/ContextProvider';
import MyDialog from '../MUI/MyDialog';
import FormDialog from './FormDialog';

const columns: Column[] = [
    { id: 'value', label: 'Valor', minWidth: 80 },
    { id: 'label', label: 'Etiqueta', minWidth: 100 },
    { id: 'creado', label: 'Creado', minWidth: 100 },
];

export default function OpcCursos() 
{
    const { cursos } = useStateContext()

    const [item, setItem] = React.useState<Icurso>({value:'', label:''});
    //dialog
    const [ID, setID] = React.useState<string| undefined>('');
    const [openD, setOpenD] = React.useState<boolean>(false);
    const [openDF, setOpenDF] = React.useState(false);

    const handleNew = () => {
        setID('')
        setOpenDF(true)
        setItem({value:'', label:''})
    }
    
    const handleEdit = (id:string | undefined) => {
        setItem(cursos.filter(d=>id===d.id)[0])
        setID(id)
        setOpenDF(true)
    }
    //guardar el registro
    const handleSave = () =>{
        if(ID===''){
            CursosService.newItem(item)
            setOpenDF(false)
        }else{
            CursosService.updateItem(item)
            setOpenDF(false)
        }
    }
    //borrar el registro
    const handleDelete = (id:string | undefined) => {
        setID(id)
        setOpenD(true)
    }
    const deleteFunc = () => {
        CursosService.deleteItem(ID)
        setOpenD(false)
    }
  return (
    <React.Fragment>
        <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNew}>
            Nuevo Curso
        </Button>
        { cursos && <DataTable 
                rows={cursos} 
                columns={columns} 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
                action={true}/>
        }
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
