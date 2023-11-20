import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import {TextField, MenuItem, InputAdornment, Switch, FormControlLabel, Button} from '@mui/material'
import { Isolicitud } from '../Interfaces/Isolicitud';
import Icertificado from '../Interfaces/Icertificado';
import { Icurso } from '../Interfaces/Icurso';
import { NIVEL } from '../Services/constants';
import Ifacultad from '../Interfaces/Ifacultad';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save';
import { IsolicitudVal } from '../Interfaces/IsolicitudVal';
import { valNuevaSolicitud } from '../Services/validation';
import { useMask } from '@react-input/mask';
import SolicitudesService from '../Services/sSolicitudes';
import SnackBarAdm from '../components/SnackBarAdm';

type Props = {
    tipoSolicitud:Icertificado[],
    cursos:Icurso[],
    facultades: Ifacultad[]
}

export default function NuevaSolicitud({tipoSolicitud,cursos, facultades}:Props) 
{
    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    const voucherRef = useMask({ mask: '_______________', replacement: { _: /\d/ } });
    const pagoRef = useMask({ mask: '_____', replacement: { _: /^[0-9.]*$/ } });

    //router history
    const navigate = useNavigate()

    const [item,setItem] = React.useState<Isolicitud>({
        solicitud:'',
        apellidos:'',
        nombres:'',
        dni:'',
        celular:'',
        email: '',
        idioma:'',
        numero_voucher: '',
        nivel:'',
        trabajador:false,
        fecha_pago: '',
        pago:'0',
        facultad:'PAR',
        codigo: ''
    })
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
    const [severity, setSeverity] = React.useState<"error"|"info"|"success"|"warning">('info')

    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setItem((prevFormData)=>({...prevFormData, [name]:value}))
    }
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItem({...item, [event.target.name]: event.target.checked});
    };
    const handleClick = () =>{
        //validar data
        if(valNuevaSolicitud(item, setVal)){
            //guardar en la bd
            SolicitudesService.newItem(item)
            setTexto('Solicitud guardada')
            setSeverity('success')
            setOpen(true)
            //regresar al menu anterior 
            navigate(-1)
        }else{
            //mostrar un error
            setTexto('Error al guardar solicitud')
            setSeverity('error')
            setOpen(true)
        }
    }

    return (
        <React.Fragment>
            <Box>
                <Paper elevation={2} sx={{p:2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>Nueva Solicitud</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                required
                                select 
                                error={val.solicitud}
                                sx={{width:'80%'}}
                                name='solicitud'
                                label="Tipo de Solicitud" 
                                value={item.solicitud}
                                onChange={e=>handleChange(e)}
                                helperText={val.solicitud && "Seleccione el tipo de solicitud"}>
                                {
                                    tipoSolicitud.map((option)=>(
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                inputRef={dniRef}
                                fullWidth
                                autoComplete='off'
                                error={val.dni}
                                value={item?.dni}
                                onChange={e=>handleChange(e)}
                                name="dni"
                                label="DNI"
                                helperText={val.dni && "Campo requerido, mínimo 8 dígitos"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                inputRef={celularRef}
                                error={val.celular}
                                value={item?.celular}
                                onChange={e=>handleChange(e)}
                                name="celular"
                                label="Celular"
                                helperText={val.celular && "Campo requerido, mínimo 9 dígitos"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                inputRef={apellidoRef}
                                fullWidth
                                autoComplete='off'
                                error={val.apellidos}
                                value={item?.apellidos}
                                onChange={e=>handleChange(e)}
                                name="apellidos"
                                label="Apellidos"
                                helperText={val.apellidos && "Campo requerido"}
                            />
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                inputRef={nombreRef}
                                autoComplete='off'
                                error={val.nombres}
                                value={item?.nombres}
                                onChange={e=>handleChange(e)}
                                name="nombres"
                                label="Nombres"
                                helperText={val.nombres && "Campo requerido"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                select 
                                fullWidth
                                required
                                name='idioma'
                                error={val.idioma}
                                value={item?.idioma}
                                onChange={e=>handleChange(e)}
                                label="Idioma"
                                helperText={val.idioma && "Seleccione el idioma"}>
                                {
                                    cursos.map((option)=>(
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))
                                }
                            </TextField> 
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select 
                                required
                                fullWidth
                                name='nivel'
                                error={val.nivel}
                                value={item.nivel}
                                onChange={e=>handleChange(e)}
                                label="Nivel" 
                                helperText={val.nivel && "Seleccione el nivel"}>
                                {
                                    NIVEL.map((option)=>(
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            { facultades &&
                            <TextField
                                select
                                fullWidth
                                required
                                //error={val.facultad}
                                name="facultad"
                                label="Facultad"
                                value={item?.facultad}
                                onChange={e=>handleChange(e)}
                                helperText={false && "Seleccionar facultad / Particular"}
                            >
                                {
                                    facultades?.map((option) => (
                                        <MenuItem key={option.id} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                //error={item.codigo === '' || false}
                                value={item.codigo}
                                error={val.codigo}
                                inputRef={codigoRef}
                                onChange={e=>handleChange(e)}
                                name="codigo"
                                label="Código de Alumno"
                                helperText={val.codigo && "Campo requerido, mínimo 10 dígitos"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                inputRef={voucherRef}
                                error={val.numero_voucher}
                                value={item?.numero_voucher}
                                onChange={e=>handleChange(e)}
                                name="numero_voucher"
                                label="Número de voucher"
                                helperText={val.numero_voucher && "Campo requerido, mínimo 10 dígitos"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='text'
                                fullWidth
                                inputRef={pagoRef}
                                label='Monto pagado'
                                error={val.pago}
                                value={item?.pago}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                                }}
                                onChange={e=>handleChange(e)}
                                name="pago"
                                helperText={val.pago && "Ingrese monto válido"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='date'
                                fullWidth
                                error={val.fecha_pago}
                                value={item?.fecha_pago}
                                onChange={e=>handleChange(e)}
                                name="fecha_pago"
                                helperText={val.fecha_pago && "Ingrese la fecha de pago válida"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={<Switch onChange={e=>handleChangeSwitch(e)} checked={item.trabajador} name="trabajador"/>}
                            label="Trabajador UNAC" 
                        />
                        </Grid>
                    </Grid>
                </Paper>
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
            <SnackBarAdm content={texto} open={open} setOpen={setOpen} severity={severity} />
        </React.Fragment>
    )
}
