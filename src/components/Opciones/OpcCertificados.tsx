import React from 'react'
import DialogAdm from '../../components/DialogAdm';
import DataTable from '../../components/DataTable';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { deleteItem, newItem, updateItem } from '../../Services/sCertificados';
import Icertificado from '../../Interfaces/Icertificado';
import DialogCert from '../../components/Opciones/DialogCert';

type Props = {
    certificados:Icertificado[]
}

const columns: Column[] = [
    { id: 'value', label: 'Valor', minWidth: 80 },
    { id: 'label', label: 'Etiqueta', minWidth: 100 },
    { id: 'precio', label: 'Precio (S/)', minWidth: 100 },
  ];

export default function OpcCertificados({certificados}:Props) 
{
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
            newItem(item)
            setOpenDF(false)
        }else{
            updateItem(ID as string, item)
            setOpenDF(false)
        }
    }
    const deleteFunc = () => {
        deleteItem(ID)
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
            <DialogAdm
              title='Borrar Registro' 
              content="Confirma borrar el registro?"
              open={openD} 
              setOpen={setOpenD} 
              actionFunc={deleteFunc}/>
            <DialogCert
                item={item} 
                setItem={setItem} 
                opt={ ID=='' ? 'NUEVO' : 'EDITAR' }
                content='' 
                open={openDF} 
                setOpen={setOpenDF}
                actionFunc={handleSave}/>
    </>
  )
}
