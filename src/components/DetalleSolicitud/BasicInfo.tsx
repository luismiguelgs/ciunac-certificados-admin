import { Solicitud } from "../../Interfaces/Isolicitud"
import { Grid, TextField, MenuItem } from '@mui/material'
import { ESTADO, NIVEL } from "../../Services/constants"
import Ifacultad from "../../Interfaces/Ifacultad"
import { Icurso } from "../../Interfaces/Icurso"

type Props={
    item:Solicitud
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void
    edit:boolean,
    facultades:Ifacultad[],
    cursos:Icurso[]
}
export default function BasicInfo({item, handleChange, edit, facultades, cursos}:Props){
    return(
        <Grid container spacing={2} >
            <Grid item xs={12} sm={6}>
            {item?.estado && <TextField
                        select
                        disabled={!edit}
                        fullWidth
                        name="estado"
                        label="Estado"
                        value={item?.estado}
                        onChange={e=>handleChange(e)}
                        helperText={true && "Seleccionar estado"}
                    >
                        {
                            ESTADO.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    }
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    //error={item.dni === '' || false}
                    value={item?.dni}
                    onChange={e=>handleChange(e)}
                    name="dni"
                    label="DNI"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    //error={item.apellidos === '' || false}
                    value={item?.apellidos}
                    onChange={e=>handleChange(e)}
                    name="apellidos"
                    label="Apellidos"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    //error={item.nombres === '' || false}
                    value={item?.nombres}
                    onChange={e=>handleChange(e)}
                    name="nombres"
                    label="Nombres"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    disabled={!edit}
                    fullWidth
                    //error={item.celular === '' || false}
                    value={item?.celular}
                    onChange={e=>handleChange(e)}
                    name="celular"
                    label="Celular"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={false && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        disabled={!edit}
                        fullWidth
                        //error={item.email === '' || false}
                        value={item?.email}
                        onChange={e=>handleChange(e)}
                        name="email"
                        label="Email"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText={false && "Campo requerido, mínimo 8 dígitos"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        select 
                        fullWidth
                        disabled={!edit}
                        name='idioma'
                        error={false}
                        value={item?.idioma}
                        onChange={e=>handleChange(e)}
                        label="Idioma"
                        helperText={false && "Seleccione el idioma"}>
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
                        fullWidth
                        disabled={!edit}
                        name='nivel'
                        error={false}
                        value={item.nivel}
                        onChange={e=>handleChange(e)}
                        label="Nivel" 
                        helperText={false && "Seleccione el nivel"}>
                        {
                            NIVEL.map((option)=>(
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {item?.facultad && <TextField
                        select
                        disabled={!edit}
                        fullWidth
                        name="facultad"
                        label="Facultad"
                        value={item?.facultad}
                        onChange={e=>handleChange(e)}
                        helperText={false && "Seleccionar facultad"}
                    >
                        {
                            facultades && facultades?.map((option) => (
                                <MenuItem key={option.id} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    }
                </Grid>
                <Grid item xs={12} sm={6}>
                    {item?.codigo && <TextField
                        required
                        disabled={!edit}
                        fullWidth
                        //error={item.codigo === '' || false}
                        value={item.codigo}
                        onChange={e=>handleChange(e)}
                        name="codigo"
                        label="Código de Alumno"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText={false && "Campo requerido, mínimo 8 dígitos"}
                    />
                    }
                </Grid>
            </Grid>
    )
}