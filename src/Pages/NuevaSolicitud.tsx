import React from 'react'
import { Box, Grid, Button } from '@mui/material';
import { Isolicitud } from '../Interfaces/Isolicitud';
import { useNavigate } from 'react-router-dom'
import { IsolicitudVal } from '../Interfaces/IsolicitudVal';
import { valNuevaSolicitud } from '../Services/validation';
import SolicitudesService from '../Services/sSolicitudes';
import NuevaSolicitudForm from '../components/NuevaSolicitud/NuevaSolicitudForm';
import { ArrowBackIcon, SaveIcon } from '../Services/icons';
import MyDialog from '../components/MUI/MyDialog';

const NEW_OBJ = {solicitud:'',apellidos:'',nombres:'',dni:'',celular:'',email: '',idioma:'',numero_voucher: '',nivel:'',trabajador:false,fecha_pago: '',
    pago:'0',facultad:'PAR',codigo: '',creado:'', modificado:''
}

const VAL_OBJ = {solicitud:false, nombres:false, apellidos:false, dni:false, celular:false, idioma:false, nivel:false, pago:false, numero_voucher:false,
    fecha_pago:false, codigo:false
}

export default function NuevaSolicitud() 
{
    //router history
    const navigate = useNavigate()
    //Objeto solicitud
    const [item,setItem] = React.useState<Isolicitud>(NEW_OBJ)
    //Objeto de validación
    const [val, setVal] = React.useState<IsolicitudVal>(VAL_OBJ)
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
                            startIcon={<ArrowBackIcon />}>
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
            <MyDialog open={open}  setOpen={setOpen} content={texto} title='Nueva Solicitud' type='SIMPLE' />
        </React.Fragment>
    )
}
