import { Isolicitud } from "../../Interfaces/Isolicitud"
import { Grid, TextField, MenuItem } from '@mui/material'
import { ESTADO, NIVEL } from "../../Services/constants"
import Ifacultad from "../../Interfaces/Ifacultad"
import { Icurso } from "../../Interfaces/Icurso"
import FaceIcon from '@mui/icons-material/Face';
import Chip from '@mui/material/Chip';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import PowerIcon from '@mui/icons-material/Power';

type Props={
    item:Isolicitud
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void
    edit:boolean,
    facultades:Ifacultad[],
    cursos:Icurso[]
}
export default function BasicInfo({item, handleChange, edit, facultades, cursos}:Props){
    return(
        <Grid container spacing={2} >
            <Grid item xs={12}>
                {
                    item.estado === 'NUEVO' ? 
                    (<Chip icon={<MilitaryTechIcon />} label="Solicitud Nueva" sx={{m:1}} color="error"/>) : 
                    item.estado === 'ELABORADO' ?
                    (<Chip icon={<MilitaryTechIcon />} label="Solicitud Elaborada" sx={{m:1}} color="warning"/>) : 
                    (<Chip icon={<MilitaryTechIcon />} label="Solicitud Terminada" sx={{m:1}} color="success"/>)
                }
                {
                    item.facultad !== 'PAR' ? 
                    (<Chip icon={<FaceIcon />} label="Alumno UNAC" sx={{m:1}} color="primary"/>) : 
                    item.trabajador ? 
                    (<Chip icon={<FaceIcon />} label="Trabajador UNAC" sx={{m:1}} color="primary" />) :
                    (<Chip icon={<FaceIcon />} label="PARTICULAR" sx={{m:1}} color="primary"/>)
                }
                {
                    item.antiguo ? 
                    (<Chip icon={<TextSnippetIcon />} label="Matrícula Antigua" sx={{m:1}} color="secondary"/>) : 
                    (<Chip icon={<TextSnippetIcon />} label="Matrícula en Sistema" sx={{m:1}} color="secondary"/>)
                }
                {
                    item.manual === true ? 
                    (<Chip icon={<PowerIcon />} label="Solicitud Manual" sx={{m:1}} />) : 
                    (<Chip icon={<OnlinePredictionIcon />} label="Solicitud Online" sx={{m:1}} />)
                }
            </Grid>
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
                    <TextField
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
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
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
                </Grid>
            </Grid>
    )
}