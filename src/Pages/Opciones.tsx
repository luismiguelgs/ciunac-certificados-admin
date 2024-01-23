import React from 'react'
import Icertificado from '../Interfaces/Icertificado';
import { Typography, Box } from '@mui/material';
import OpcCertificados from '../components/Opciones/OpcCertificados';
import OpcTextos from '../components/Opciones/OpcTextos';
import OpcCursos from '../components/Opciones/OpcCursos';
import { Icurso } from '../Interfaces/Icurso';
import OpcFacultades from '../components/Opciones/OpcFacultades';
import Ifacultad from '../Interfaces/Ifacultad';
import MyTabs, { PanelTab } from '../components/MUI/MyTabs';

type Props = {
  certificados:Icertificado[],  
  cursos:Icurso[],
  facultades:Ifacultad[]
}

export default function Opciones({certificados, cursos, facultades}:Props)
{
    const panels:PanelTab[] = [
      {
        label: 'Certificados',
        content: <OpcCertificados certificados={certificados}/>
      },
      {
        label: 'Textos',
        content: <OpcTextos />
      },
      {
        label: 'Cursos',
        content: <OpcCursos cursos={cursos}/>
      },
      {
        label: 'Facultades',
        content: <OpcFacultades data={facultades}/>
      }
    ]
    
    return (
      <React.Fragment>
        <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>Opciones</Typography>
          <MyTabs panels={panels} />
        </Box>
      </React.Fragment>
    )
}
