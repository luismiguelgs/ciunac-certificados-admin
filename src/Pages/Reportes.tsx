import React from 'react'
import { Isolicitud } from "../Interfaces/Isolicitud";
import DataTable from "../components/MUI/DataTable";
import { Grid, Button, Typography, TextField } from '@mui/material';
import { exportToExcel } from "../Services/util";
import { CloudDownloadIcon } from '../Services/icons';
import SolicitudesService from '../Services/sSolicitudes';

const columns: Column[] = [
    { id:'creado', label:'Fecha',minWidth:40},
    { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
    { id: 'nombres', label: 'Nombres', minWidth: 120 },
    { id: 'idioma', label: 'Idioma', minWidth: 25, align: 'right' },
    { id: 'nivel', label: 'Nivel', minWidth: 25, align: 'right' },
    { id: 'pago', label: 'Abono(S/)', minWidth: 25 },
    { id: 'numero_voucher', label: 'Número de recibo', minWidth: 80 },
    { id: 'estado', label: 'Estado', minWidth: 30 },
];

export default function Reportes() 
{
    //data y bd
    const [fechaInicial, setFechaInicial] = React.useState<string>(new Date().toISOString().split('T')[0])
    const [displayFechaFinal, setDisplayFechaFinal] = React.useState<string>(new Date().toISOString().split('T')[0])
    const [fechaFinal, setFechaFinal] = React.useState<string>(new Date().toISOString().split('T')[0])
    const [data, setData] = React.useState<Isolicitud[]>([]);
    
    React.useEffect(()=>{
        SolicitudesService.fetchItemQueryDate(setData,fechaInicial,fechaFinal)
      },[fechaInicial,fechaFinal]);

    //aumenta un dia la fecha final
    const handleFechaFinalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputDate = e.target.value;
      const isValidDate = !isNaN(new Date(inputDate).getTime());
      if (isValidDate) {
        // Obtener la fecha siguiente agregando un día a la fecha ingresada
        setDisplayFechaFinal(inputDate)
        const nextDate = new Date(new Date(inputDate).getTime() + 24 * 60 * 60 * 1000);
        setFechaFinal(nextDate.toISOString().split('T')[0]);
      } else {
        console.error('Fecha inválida');
      }
    };
    
    const handleExport = async() => {
      await exportToExcel(data)           
    }

    return (
      <React.Fragment>
          <Typography variant="h4" gutterBottom>Reporte</Typography>
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={6}>
              <TextField
                type='date'
                sx={{mb:2, width:'95%'}}
                required
                disabled={false}
                error={false}
                value={fechaInicial}
                onChange={(e)=>{
                  const inputDate = e.target.value;
                  const isValidDate = !isNaN(new Date(inputDate).getTime());
                  if (isValidDate) {
                    setFechaInicial(inputDate);
                  } else {
                    console.error('Fecha inválida');
                  }
                }}
                name="fecha"
                label="Fecha Inicial"
                helperText={false && "Ingrese la fecha válida"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  type='date'
                  sx={{mb:2, width:'95%'}}
                  required
                  disabled={false}
                  error={false}
                  value={displayFechaFinal}
                  onChange={handleFechaFinalChange}
                  name="fecha"
                  label="Fecha Final"
                  helperText={false && "Ingrese la fecha válida"}
                />
            </Grid>
          </Grid>
          
          <DataTable columns={columns} rows={data} action={false} />
          <Button onClick={handleExport} variant="contained" endIcon={<CloudDownloadIcon />} sx={{mt:1}}>
            Exportar a Excel
          </Button>
      </React.Fragment>
    )
}
