import Chart from 'react-apexcharts';
import React from 'react'
import { Isolicitud } from '../../Interfaces/Isolicitud';

type Options = {
  label:string,
  filter:string,
}

type Props = {
  data:Isolicitud[],
  dataOptions?:Options[]
}

const options: ApexCharts.ApexOptions = {
  chart: {
    type: 'pie',
  },
  labels: ['Inglés', 'Portugués', 'Italiano', 'Francés', 'Otros'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}
  
export default function ChartDonut({data}:Props)
{
    /*
    const filters:string[] = []
    dataOptions.forEach(element => {
      options.labels?.push(element.label)
      filters.push(element.filter)
    });
    */
    const ingles = data.filter(objeto => objeto.idioma === 'INGLES').length;
    const portugues = data.filter(objeto => objeto.idioma === 'PORTUGUES').length;
    const italiano = data.filter(objeto => objeto.idioma === 'ITALIANO').length;
    const frances = data.filter(objeto => objeto.idioma === 'FRANCES').length;
    const otros = data.length - ingles - portugues - italiano - frances

    // Datos para el gráfico
    const series = [ingles, portugues, italiano, frances, otros]

    return (
      <React.Fragment>
          <Chart options={options} series={series} type="pie" width="92%"/>
      </React.Fragment>
    )
}
