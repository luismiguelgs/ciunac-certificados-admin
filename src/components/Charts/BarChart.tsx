import React from 'react'
import Chart from 'react-apexcharts';
import { Isolicitud } from '../../Interfaces/Isolicitud';


type Props = {
  horizontal: boolean
  data: Isolicitud[]
}

export default function BarChart({horizontal, data}:Props) 
{
    let series:any
    if(horizontal){
        const fcc = data.filter(objeto => objeto.facultad === 'FCC').length;
        const fpa = data.filter(objeto => objeto.facultad === 'FPA').length;
        const fce = data.filter(objeto => objeto.facultad === 'FCE').length;
        const fca = data.filter(objeto => objeto.facultad === 'FCA').length;
        const fnm = data.filter(objeto => objeto.facultad === 'FNM').length;
        const fme = data.filter(objeto => objeto.facultad === 'FME').length;
        const fee = data.filter(objeto => objeto.facultad === 'FEE').length;
        const fcs = data.filter(objeto => objeto.facultad === 'FCS').length;
        const far = data.filter(objeto => objeto.facultad === 'FAR').length;
        const fis = data.filter(objeto => objeto.facultad === 'FIS').length;
        const fiq = data.filter(objeto => objeto.facultad === 'FIQ').length;
        const par = data.filter(objeto => objeto.facultad === 'PAR').length;

        series = [
          {
              name: 'Facultad',
              data: [fcc, fpa, fce, fca, fnm, fme, fee, fcs, far, fis, fiq, par],
          },
        ]
    }else{
        const nuevos = data.filter(objeto => objeto.estado === 'NUEVO').length;
        const elaborados = data.filter(objeto => objeto.estado === 'ELABORADO').length;
        const entregados = data.filter(objeto => objeto.estado === 'ENTREGADO').length;

        series = [
          {
              name: 'Estados',
              data: [nuevos, elaborados, entregados],
          },
        ]
    }
    let options: ApexCharts.ApexOptions
    if(horizontal){
      options = {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: horizontal,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['FCC', 'FPA', 'FCE', 'FCA', 'FNM', 'FME', 'FEE','FCS','FAR','FIS','FIQ','PAR'],
        },
        yaxis: {
          title: {
            text: 'Facultades',
          },
        },
        
      };
    }else{
      options = {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: horizontal,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['NUEVOS', 'ELABORADOS', 'ENTREGADOS'],
        },
        yaxis: {
          title: {
            text: 'Valores',
          },
        },
        
      };
    }
    
    return (
      <React.Fragment>
          <Chart options={options} series={series} type="bar" width="100%"/>
      </React.Fragment>
    )
}
