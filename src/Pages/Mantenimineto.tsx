import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImgTrabajador from '../components/Mantenimiento/ImgTrabajador';
import SolEntregadas from '../components/Mantenimiento/SolEntregadas';
import ImgVouchers from '../components/Mantenimiento/ImgVouchers';
import Solicitudes from '../components/Mantenimiento/Solicitudes';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Mantenimineto() 
{
    //tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      console.log(event);
      setValue(newValue);
    };

    return (
      <React.Fragment>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom>Mantenimiento</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Imágenes de Vouchers" />
              <Tab label="Imágenes de Cert.Trabajador" />
              <Tab label="Solicitudes Entregadas" />
              <Tab label="Solicitudes" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ImgVouchers />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ImgTrabajador />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <SolEntregadas />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Solicitudes />
          </CustomTabPanel>
        </Box>
      </React.Fragment>
    )
}
