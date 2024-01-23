import { Timestamp } from "firebase/firestore";
import * as ExcelJS from 'exceljs';
import { Isolicitud } from "../Interfaces/Isolicitud";

export const changeDate = (date:Timestamp, hora=true):string|undefined => {
    if(date === null) return
    const fecha:Date  = date?.toDate()
    // Obtener diferentes partes de la fecha y hora
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, se suma 1
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    // Formatear los valores para que tengan dos dígitos si es necesario
    
    const diaFormateado = String(dia).padStart(2, '0');
    const mesFormateado = String(mes).padStart(2, '0');
    if(hora){
      const horasFormateadas = String(horas).padStart(2, '0');
      const minutosFormateados = String(minutos).padStart(2, '0');
      const segundosFormateados = String(segundos).padStart(2, '0');
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio} ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
      return fechaFormateada
    }else{
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;
      return fechaFormateada
    }
} 
  
export async function exportToExcel(data:Isolicitud[])
{
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('DataSheet');

  const dataF = formatearDatos(data)

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
const formatearDatos =(data:Isolicitud[]) =>{
  const excelData:any[] = [['Apellidos','Nombres','DNI','Idioma','Nivel','Pago','Recibo','Estado']]
  data.forEach((row)=>{
    excelData.push([
      row.apellidos.toUpperCase(),row.nombres.toUpperCase(), row.dni, row.idioma, row.nivel, +row.pago, row.numero_voucher, row.estado
    ])
  })
  return excelData
}