import { FormControlLabel, Grid, InputAdornment, MenuItem, Paper, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import { useMask } from '@react-input/mask';
import Icertificado from '../../Interfaces/Icertificado';
import { Icurso } from '../../Interfaces/Icurso';
import Ifacultad from '../../Interfaces/Ifacultad';
import { NIVEL } from '../../Services/constants';
import { IsolicitudVal } from '../../Interfaces/IsolicitudVal';
import { Isolicitud } from '../../Interfaces/Isolicitud';

type Props = {
    tipoSolicitud:Icertificado[],
    cursos:Icurso[],
    facultades: Ifacultad[],
    val:IsolicitudVal,
    item:Isolicitud,
    setItem:React.Dispatch<React.SetStateAction<Isolicitud>>
}

export default function NuevaSolicitudForm({tipoSolicitud,cursos,facultades, val, item, setItem}:Props) 
{
    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    const voucherRef = useMask({ mask: '_______________', replacement: { _: /\d/ } });
    const pagoRef = useMask({ mask: '_____', replacement: { _: /^[0-9.]*$/ } });

    //Flag para guardar fecha de creacion
    const [fechaCreacion, setFechaCreacion] = React.useState(false)

    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setItem((prevFormData)=>({...prevFormData, [name]:value}))
    }
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>, fecha=false) => {
        if(fecha){
            setFechaCreacion(!fechaCreacion)
        }else{
            setItem({...item, [event.target.name]: event.target.checked});
        }
    };

    return (
        <React.Fragment>
            <Paper elevation={2} sx={{p:2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>Nueva Solicitud</Typography>
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
                                autoComplete='off'
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
                                value={item.codigo}
                                error={val.codigo}
                                autoComplete='off'
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
                                autoComplete='off'
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
                                label='Fecha de Pago'
                                error={val.fecha_pago}
                                value={item?.fecha_pago}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='date'
                                fullWidth
                                label='Fecha de Ingreso'
                                disabled={!fechaCreacion}
                                //error={val.fecha_pago}
                                value={item?.creado}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e=>handleChange(e)}
                                name="creado"
                                helperText={val.fecha_pago && "Ingrese la fecha válida"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Switch onChange={e=>handleChangeSwitch(e,true)} checked={fechaCreacion} name="fecha_creacion"/>}
                                label="Ingresar Fecha de solicitud" 
                            />
                        </Grid>
                    </Grid>
                </Paper>
    </React.Fragment>
  )
}
