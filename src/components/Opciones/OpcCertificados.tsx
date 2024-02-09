import React from 'react'
import DataTable, { Column } from '../MUI/DataTable';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CertificadosService from '../../Services/sCertificados';
import { useStateContext } from '../../contexts/ContextProvider';
import { Icertificado } from '../../Interfaces/Types';
import MyDialog from '../MUI/MyDialog';
import FormDialog from './FormDialog';

const columns: Column[] = [
    { id: 'value', label: 'Valor', minWidth: 80 },
    { id: 'label', label: 'Etiqueta', minWidth: 100 },
    { id: 'precio', label: 'Precio (S/)', minWidth: 100 },
  ];

export default function OpcCertificados() 
{
    const {certificados} = useStateContext()

    const [item, setItem] = React.useState<Icertificado>({value:'', label:'',precio:0});
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
        setItem(certificados.filter(d=>id===d.id)[0])
        setID(id)
        setOpenDF(true)
    }
    const handleNew = () =>{
        setID('')
        setOpenDF(true)
        setItem({value:'', label:'',precio:0})
    }
    const handleSave = () =>{
        if(ID===''){
            CertificadosService.newItem(item)
            setOpenDF(false)
        }else{
            CertificadosService.updateItem(ID as string, item)
            setOpenDF(false)
        }
    }
    const deleteFunc = () => {
        CertificadosService.deleteItem(ID)
        setOpenD(false)
    }
  return (
    <>
        <Button variant="contained" endIcon={<AddIcon /> } sx={{mb:1}} onClick={handleNew}>
            Nuevo Certificado
        </Button>
        <DataTable 
            rows={certificados} 
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
            content={<FormDialog item={item} setItem={setItem} opt={ID === '' ? 'NUEVO' : 'EDITAR'} certificado={true} />}
            actionFunc={handleSave} />
    </>
  )
}
