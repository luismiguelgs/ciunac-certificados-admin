import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'
import { Isolicitud } from '../Interfaces/Isolicitud';
import Icertificado from '../Interfaces/Icertificado';
import { Icurso } from '../Interfaces/Icurso';
import Ifacultad from '../Interfaces/Ifacultad';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save';
import { IsolicitudVal } from '../Interfaces/IsolicitudVal';
import { valNuevaSolicitud } from '../Services/validation';

import SolicitudesService from '../Services/sSolicitudes';
import DialogAdm from '../components/Dialogs/DialogAdm';
import NuevaSolicitudForm from '../components/NuevaSolicitud/NuevaSolicitudForm';

type Props = {
    tipoSolicitud:Icertificado[],
    cursos:Icurso[],
    facultades: Ifacultad[]
}
const NEW_OBJ = {solicitud:'',apellidos:'',nombres:'',dni:'',celular:'',email: '',idioma:'',numero_voucher: '',nivel:'',trabajador:false,fecha_pago: '',
    pago:'0',facultad:'PAR',codigo: ''}

export default function NuevaSolicitud({tipoSolicitud,cursos, facultades}:Props) 
{
    //router history
    const navigate = useNavigate()

    const [item,setItem] = React.useState<Isolicitud>(NEW_OBJ)
    const [val, setVal] = React.useState<IsolicitudVal>({
        solicitud:false,
        nombres:false, 
        apellidos:false,
        dni:false,
        celular:false,
        idioma:false,
        nivel:false,
        pago:false,
        numero_voucher:false,
        fecha_pago:false,
        codigo:false
    })
    //snackbar
    const [open, setOpen] = React.useState<boolean>(false)
    const [texto, setTexto] = React.useState<string>('')

    const handleClick = () =>{
        //validar data
        if(valNuevaSolicitud(item, setVal)){
            //guardar en la bd
            SolicitudesService.newItem(item)
            setTexto('Solicitud guardada')
            setOpen(true)
            //resetear el formulario
            setItem(NEW_OBJ)
        }else{
            //mostrar un error
            setTexto('Error al guardar solicitud')
            setOpen(true)
        }
    }

    return (
        <React.Fragment>
            <Box>
                <NuevaSolicitudForm 
                    tipoSolicitud={tipoSolicitud} 
                    cursos={cursos} 
                    facultades={facultades} 
                    val={val} 
                    item={item}
                    setItem={setItem}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                            onClick={()=>navigate(-1)} 
                            variant="contained" 
                            color="secondary" 
                            sx={{m:2}}
                            startIcon={<ArrowBackIcon/>}>
                            Atras
                        </Button>
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={handleClick}
                            sx={{m:2}} 
                            endIcon={<SaveIcon />}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <DialogAdm open={open} setOpen={setOpen} content={texto} title='Nueva Solicitud' alert={true}/>
        </React.Fragment>
    )
}
