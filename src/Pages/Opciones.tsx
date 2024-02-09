import React from 'react'
import { Typography, Box } from '@mui/material';
import OpcCertificados from '../components/Opciones/OpcCertificados';
import OpcTextos from '../components/Opciones/OpcTextos';
import OpcCursos from '../components/Opciones/OpcCursos';
import OpcFacultades from '../components/Opciones/OpcFacultades';
import MyTabs, { PanelTab } from '../components/MUI/MyTabs';

export default function Opciones()
{

    const panels:PanelTab[] = [
      {
        label: 'Certificados',
        content: <OpcCertificados />
      },
      {
        label: 'Textos',
        content: <OpcTextos />
      },
      {
        label: 'Cursos',
        content: <OpcCursos />
      },
      {
        label: 'Facultades',
        content: <OpcFacultades />
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
