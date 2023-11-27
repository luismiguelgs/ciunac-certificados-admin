import React from 'react'
import { firestore } from '../Services/firebase';
import { collection, onSnapshot,query, where } from 'firebase/firestore';
import { Isolicitud } from "../Interfaces/Isolicitud";
import DataTable from "../components/DataTable";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import * as ExcelJS from 'exceljs';
import { Grid } from '@mui/material';

const columns: Column[] = [
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
    const [fechaFinal, setFechaFinal] = React.useState<string>(new Date().toISOString().split('T')[0])
    const [data, setData] = React.useState<Isolicitud[]>([]);
    const db = collection(firestore, 'solicitudes');
    const itemQuery =  query(db, where('creado',">=",new Date(fechaInicial)),where('creado',"<=",new Date(fechaFinal)))

    React.useEffect(()=>{
        onSnapshot(itemQuery, (data)=>{
          setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id  } as Isolicitud
          }));
        });
      },[fechaInicial,fechaFinal]);
    
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
        excelData.push([row.apellidos,row.nombres, row.dni, row.idioma, row.nivel, +row.pago, row.numero_voucher, row.estado])
      })
      return excelData
    }
    return (
      <React.Fragment>
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={6}>
              <TextField
                type='date'
                sx={{mb:2, width:'95%'}}
                required
                disabled={false}
                error={false}
                value={fechaInicial}
                onChange={(e)=>setFechaInicial(e.target.value)}
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
                  value={fechaFinal}
                  onChange={(e)=>setFechaFinal(e.target.value)}
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
