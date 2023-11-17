import {Grid} from '@mui/material';
import ChartDonut from '../components/Charts/ChartDonut';
import ChartLine from '../components/Charts/ChartLine';

export default function Test()
{
    return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <ChartDonut />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChartLine />
          </Grid>
        </Grid>
    )
}