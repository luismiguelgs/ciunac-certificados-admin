import React from 'react'
import Icertificado from '../Interfaces/Icertificado';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OpcCertificados from '../components/Opciones/OpcCertificados';
import OpcTextos from '../components/Opciones/OpcTextos';
import OpcCursos from '../components/Opciones/OpcCursos';
import { Icurso } from '../Interfaces/Icurso';
import OpcFacultades from '../components/Opciones/OpcFacultades';
import Ifacultad from '../Interfaces/Ifacultad';


type Props = {
  certificados:Icertificado[],  
  cursos:Icurso[],
  facultades:Ifacultad[]
}
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

export default function Opciones({certificados, cursos, facultades}:Props)
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Certificados" />
              <Tab label="Textos" />
              <Tab label="Cursos" />
              <Tab label="Facultades" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <OpcCertificados certificados={certificados}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <OpcTextos />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <OpcCursos cursos={cursos}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <OpcFacultades data={facultades}/>
          </CustomTabPanel>
        </Box>
      </React.Fragment>
    )
}
