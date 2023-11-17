import Chart from 'react-apexcharts';
import React from 'react'

// Datos para el gráfico de líneas
const series = [
  {
    name: 'Series 1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
];

const options: ApexCharts.ApexOptions = {
  chart: {
    id: 'basic-line-chart',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
};
  
export default function ChartLine() {
  return (
    <React.Fragment>
        <Chart options={options} series={series} type="line" width="100%"/>
    </React.Fragment>
  )
}
