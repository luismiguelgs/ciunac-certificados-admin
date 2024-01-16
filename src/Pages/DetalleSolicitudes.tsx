import { Grid, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { Isolicitud } from '../Interfaces/Isolicitud';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicInfo from '../components/DetalleSolicitud/BasicInfo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import FinInfo from '../components/DetalleSolicitud/FinInfo';
import DialogAdm from '../components/Dialogs/DialogAdm';
import SnackBarAdm from '../components/SnackBarAdm';
import Info2010 from '../components/DetalleSolicitud/Info2010';
import Icertificado from '../Interfaces/Icertificado';
import Ifacultad from '../Interfaces/Ifacultad';
import { Icurso } from '../Interfaces/Icurso';
import SolicitudesService from '../Services/sSolicitudes';
import { valEditarSolicitud } from '../Services/validation';

type Props = {
    certificados:Icertificado[],
    facultades: Ifacultad[],
    cursos:Icurso[]
}

export default function DetalleSolicitudes({certificados, facultades, cursos}:Props)
{
    
    //history
    const navigate = useNavigate()
    //manejo de snackbar
    const [openS, setOpenS] = React.useState<boolean>(false); 
    
    //manejo de dialogo
    const [openD, setOpenD] = React.useState<boolean>(false);

    //datos de solicitud
    const [item, setItem] = useState<Isolicitud>({id:'', solicitud:'', antiguo:false, apellidos:'', nombres:'', 
        celular:'', certificado_trabajo:'', codigo:'', dni:'', email:'', idioma:'', nivel:'', numero_voucher:'',
        facultad:'', fecha_pago:'', timestamp:'', trabajador:false, voucher:'', estado:'', pago:''})
    let {id} = useParams()

    useEffect(()=>{
        const getItem = async(id :string) =>{
            let solicitud = await SolicitudesService.getItem(id) as Isolicitud
            setItem(solicitud)
        }
        getItem(id as string)
    },[])

    //control del acordion
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleExpand = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        console.log(event.type);
        setExpanded(isExpanded ? panel : false);
    };
    
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

    return (
        item && <><Grid container spacing={2} >
            <Grid item xs={12}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleExpand('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Información de Alumno</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <BasicInfo item={item} handleChange={handleChange} edit={edit} facultades={facultades} cursos={cursos}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleExpand('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Información de solicitud</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FinInfo item={item} handleChange={handleChange} edit={edit} tipoSolicitud={certificados}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion disabled={!item.trabajador} expanded={expanded === 'panel3'} onChange={handleExpand('panel3')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography>Información de trabajador</Typography>
                    </AccordionSummary>
                    
                    <AccordionDetails>
                    {item.trabajador && (<img src={item?.certificado_trabajo} width={280}/>)}
                    </AccordionDetails>
                    
                </Accordion>
                <Accordion disabled={!item.antiguo} expanded={expanded === 'panel4'} onChange={handleExpand('panel4')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography>Información de cursos anteriores al 2009</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                       {item.id && <Info2010 id={item.id as string}/> }
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Button 
                    //component={Link} 
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
        <SnackBarAdm open={openS} setOpen={setOpenS} content='Verificar que todos los datos esten ingresados' />
        <DialogAdm 
            title='Guardar Registro' 
            content='Confirma guardar los datos actuales?' 
            open={openD}
            setOpen={setOpenD}
            actionFunc={saveItem}/>
      </>
    )
}