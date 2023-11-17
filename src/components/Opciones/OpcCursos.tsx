import React from 'react'
import { Icurso } from '../../Interfaces/Icurso'
import DataTable from '../DataTable'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogAdm from '../DialogAdm';
import DialogCurso from './DialogCurso';
import CursosService from '../../Services/sCursos';

type Props={
    cursos:Icurso[]
}

const columns: Column[] = [
    { id: 'value', label: 'Valor', minWidth: 80 },
    { id: 'label', label: 'Etiqueta', minWidth: 100 },
    { id: 'creado', label: 'Creado', minWidth: 100 },
];

export default function OpcCursos({cursos}:Props) 
{
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
        <DialogAdm
              title='Borrar Registro' 
              content="Confirma borrar el registro?"
              open={openD} 
              setOpen={setOpenD} 
              actionFunc={deleteFunc}/>
        <DialogCurso
                item={item} 
                setItem={setItem} 
                title={ ID=='' ? 'Nuevo Item' : 'Editar Item' }
                content='' 
                open={openDF} 
                setOpen={setOpenDF}
                actionFunc={handleSave}/>
    </React.Fragment>
  )
}
