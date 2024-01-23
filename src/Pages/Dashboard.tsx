import React from 'react'
import {Grid} from '@mui/material';
import ChartDonut from '../components/Charts/ChartDonut';
import ChartLine from '../components/Charts/ChartLine';
import CardChart from '../components/Charts/CardChart';
import BarChart from '../components/Charts/BarChart';
import { Isolicitud } from '../Interfaces/Isolicitud';

import SolicitudesService from '../Services/sSolicitudes';

export default function Dashboard()
{
    const [data, setData] = React.useState<Isolicitud[]>([]);
    
    React.useEffect(()=>{
      const getData = async()=>{
        SolicitudesService.fetchItems(setData)
      }
      getData()
    },[])
    return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardChart title='Solicitudes por Idioma'>
                {data && <ChartDonut data={data}/>}
            </CardChart>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardChart title='Solicitudes por mes'>
              {data &&<ChartLine data={data}/> }
            </CardChart>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardChart title='Solicitudes por Facultad'>
                {data && <BarChart data={data} horizontal={true}/>}
            </CardChart>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardChart title='Solicitudes por estado'>
              {data && <BarChart data={data} horizontal={false}/>}
            </CardChart>
          </Grid>
        </Grid>
    )
}