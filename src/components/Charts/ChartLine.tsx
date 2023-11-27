import Chart from 'react-apexcharts';
import React from 'react'
import { Isolicitud } from '../../Interfaces/Isolicitud';


const options: ApexCharts.ApexOptions = {
  chart: {
    id: 'basic-line-chart',
  },
  xaxis: {
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set','Oct','Nov','Dic'],
  },
};

type Props = {
  data: Isolicitud[]
}
  
export default function ChartLine({data}:Props) 
{
   
    //filtrar por el año actual
    const añoActual = new Date().getFullYear();
    const objetosConAñoActual = data.filter(objeto => parseInt((objeto.creado as string).split('/')[2]) === añoActual);

    const mes = []

    for (let index = 0; index < 12; index++) {
      mes[index] = objetosConAñoActual.filter(objeto => parseInt((objeto.creado as string).split('/')[1]) === index + 1)
    }

    // Datos para el gráfico de líneas
    const series = [
      {
        name: 'Año Actual',
        data: [
          mes[0].length, 
          mes[1].length, 
          mes[2].length, 
          mes[3].length, 
          mes[4].length, 
          mes[5].length,
          mes[6].length, 
          mes[7].length, 
          mes[8].length,
          mes[9].length,
          mes[10].length,
          mes[11].length,
        ],
      },
    ];
    return (
      <React.Fragment>
          <Chart options={options} series={series} type="line" width="100%"/>
      </React.Fragment>
    )
}
