import React from 'react'
import { firestore } from '../Services/firebase';
import { collection, onSnapshot,query, where } from 'firebase/firestore';
import { Isolicitud } from "../Interfaces/Isolicitud";
import DataTable from "../components/DataTable";
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import * as ExcelJS from 'exceljs';
import { Grid } from '@mui/material';
import { changeDate } from "../Services/util";

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
    const db = collection(firestore, 'solicitudes');
    
    React.useEffect(()=>{
        console.log(fechaFinal);
        const itemQuery =  query(db, where('creado',">=",new Date(fechaInicial)),where('creado',"<=",new Date(fechaFinal)))
        onSnapshot(itemQuery, (data)=>{
          setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true) } as Isolicitud
          }));
        });
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
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('DataSheet');

      const dataF = formatearDatos()

      // Agregar datos a la hoja de cálculo
      dataF.forEach(row => {
        worksheet.addRow(row as any);
      });
      // Generar un blob a partir del libro de Excel
      const buffer = await workbook.xlsx.writeBuffer();
      // Crear un objeto Blob
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'datos.xlsx';

      // Agregar el enlace al documento y hacer clic para iniciar la descarga
      document.body.appendChild(a);
      a.click();

      // Limpiar el enlace después de la descarga
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

    const formatearDatos =() =>{
      const excelData:any[] = [['Apellidos','Nombres','DNI','Idioma','Nivel','Pago','Recibo','Estado']]
      data.forEach((row)=>{
        excelData.push([
          row.apellidos.toUpperCase(),row.nombres.toUpperCase(), row.dni, row.idioma, row.nivel, +row.pago, row.numero_voucher, row.estado
        ])
      })
      return excelData
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
