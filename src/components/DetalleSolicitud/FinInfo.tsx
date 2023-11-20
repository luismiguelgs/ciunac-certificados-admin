import { Grid, TextField, MenuItem,InputAdornment } from '@mui/material'
import { Solicitud } from '../../Interfaces/Isolicitud'
import Icertificado from '../../Interfaces/Icertificado'
import Link from '@mui/material/Link';
import pdfLogo from '../../assets/pdf.png'

type Props={
    item:Solicitud
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void
    edit:boolean,
    tipoSolicitud:Icertificado[]
}

export default function FinInfo({item,handleChange, edit, tipoSolicitud}:Props)
{
    const archivo = item.voucher?.split('?')[0].slice(-3);
    
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                    <TextField 
                        select 
                        name='solicitud'
                        disabled={!edit}
                        sx={{width:'95%', mb:2}}
                        label="Tipo de Solicitud" 
                        value={item.solicitud}
                        onChange={e=>handleChange(e)}
                        helperText={false && "Seleccione el tipo de solicitud"}>
                        {
                            tipoSolicitud.map((option)=>(
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        disabled={!edit}
                        sx={{width:'95%', mb:2}}
                        fullWidth
                        error={false}
                        value={item?.numero_voucher}
                        onChange={e=>handleChange(e)}
                        name="numero_voucher"
                        label="Número de voucher"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText={false && "Campo requerido, mínimo 8 dígitos"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='number'
                        sx={{mb:2, width:'95%'}}
                        required
                        disabled={!edit}
                        error={false}
                        value={item?.pago}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                        }}
                        onChange={e=>handleChange(e)}
                        name="pago"
                        helperText={false && "Ingrese monto válido"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='date'
                        sx={{mb:2, width:'95%'}}
                        required
                        disabled={!edit}
                        error={false}
                        value={item?.fecha_pago}
                        onChange={e=>handleChange(e)}
                        name="fecha"
                        helperText={false && "Ingrese la fecha de pago válida"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Link href={item?.voucher} underline='always' target='_blank' rel="noopener">
                        VER VOUCHER
                    </Link>
                </Grid>
            </Grid>
                <Grid item xs={12} sm={6}>
                   { archivo=='pdf' ? (<img src={pdfLogo} width={290}/>):(<img src={item?.voucher} width={290}/>)}
                </Grid>
        </Grid>
    )
}