import { Grid, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { Isolicitud } from '../Interfaces/Isolicitud';
import BasicInfo from '../components/DetalleSolicitud/BasicInfo';
import FinInfo from '../components/DetalleSolicitud/FinInfo';
import Info2010 from '../components/DetalleSolicitud/Info2010';
import SolicitudesService from '../Services/sSolicitudes';
import { valEditarSolicitud } from '../Services/validation';
import MyAccordion, { PanelData } from '../components/MUI/MyAccordion';
import { ArrowBackIcon, EditNoteIcon, SaveIcon } from '../Services/icons';
import { MySnackBar, MyDialog } from '../components/MUI';

export default function DetalleSolicitudes()
{
    
    //history
    const navigate = useNavigate()
    //manejo de snackbar
    const [openS, setOpenS] = React.useState<boolean>(false); 
    
    //manejo de dialogo
    const [openD, setOpenD] = React.useState<boolean>(false);

    //datos de solicitud
    const [item, setItem] = useState<Isolicitud>({id:'', solicitud:'', antiguo:false, apellidos:'', nombres:'', celular:'', certificado_trabajo:'', codigo:'', 
        dni:'', email:'', idioma:'', nivel:'', numero_voucher:'',facultad:'', fecha_pago:'', timestamp:'', trabajador:false, voucher:'', estado:'', pago:''})
    
    let {id} = useParams()

    useEffect(()=>{
        const getItem = async(id :string) =>{
            let solicitud = await SolicitudesService.getItem(id) as Isolicitud
            setItem(solicitud)
        }
        getItem(id as string)
    },[])

    //manejar edicion
    const [edit, setEdit] = React.useState<boolean>(false)
    const handleClickEdit = () =>{
        setEdit(true)
    }
    //manejar guardar
    const handleClickSave = () =>{
        if(validateForm(item)){
             setOpenD(true)
        }else{
            setOpenS(true)
        }
    }
    //guardar en la bd
    const saveItem = ():void => {
        SolicitudesService.updateItem(item)
        setEdit(false)
        setOpenD(false)
    }
    const validateForm = (item:Isolicitud) =>{
        return valEditarSolicitud(item)       
    }
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setItem((prevFormData)=>({...prevFormData, [name]:value}))
    }

    const panels:PanelData[] = [
        {
            title: 'Información de Alumno',
            content: <BasicInfo item={item} handleChange={handleChange} edit={edit} />,
            disabled: false
        },
        {
            title: 'Información de solicitud',
            content: <FinInfo item={item} handleChange={handleChange} edit={edit} />,
            disabled: false
        },
        {
            title: 'Información de trabajador',
            content: <img src={item?.certificado_trabajo} width={280}/>,
            disabled: !item.trabajador
        },
        {
            title: 'Información de cursos anteriores al 2009',
            content: <Info2010 id={item.id as string}/>,
            disabled: !item.antiguo
        }
    ]

    return (
        item && <><Grid container spacing={2} >
            <Grid item xs={12}>
                <MyAccordion panels={panels} />
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={()=>navigate(-1)} 
                    variant="contained" 
                    color="secondary" 
                    sx={{ml:2}}
                    startIcon={<ArrowBackIcon/>}>
                    Atras
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ml:2}} 
                    onClick={handleClickEdit} 
                    endIcon={<EditNoteIcon />}
                    disabled={edit}>
                    Editar
                </Button>
                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleClickSave}
                    sx={{ml:2}} 
                    endIcon={<SaveIcon />}
                    disabled={!edit}>
                    Guardar
                </Button>
            </Grid>
        </Grid>
        <MySnackBar open={openS} setOpen={setOpenS} content='Verificar que todos los datos esten ingresados' />
        <MyDialog 
            type='ALERT' 
            title='Guardar Registro' 
            content='¿Confirma guardar los datos actuales?' 
            open={openD} 
            setOpen={setOpenD} 
            actionFunc={saveItem} />
      </>
    )
}