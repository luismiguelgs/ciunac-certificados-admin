import {Divider, Toolbar, Box, Drawer} from '@mui/material';
import { DRAWER_WIDTH } from '../Services/constants';
import { BuildIcon, HomeIcon, InboxIcon, InsertDriveFileIcon, NoteAddIcon, SettingsIcon, SummarizeIcon, TaskIcon } from '../Services/icons';
import MyList, { itemList } from './MUI/MyList';

const listItems1:itemList[] = [
  {label:'Inicio',route:'/',icon:<HomeIcon />},
  {label:'Solicitudes Nuevas',route:'/certificados?estado=NUEVO',icon:<InboxIcon />},
  {label:'Solicit. Elaboradas',route:'/certificados?estado=ELABORADO',icon:<InsertDriveFileIcon />},
  {label:'Solicit. Entregadas',route:'/certificados?estado=ENTREGADO',icon:<TaskIcon />},
]

const listItems2:itemList[] = [
  {label:'Reportes',route:'/reportes',icon:<SummarizeIcon />},
  {label:'Nueva Solicitud',route:'/solicitud-nueva',icon:<NoteAddIcon />},
  {label:'Opciones',route:'/opciones',icon:<SettingsIcon />},
  {label:'Mantenimiento',route:'/mantenimiento',icon:<BuildIcon />},
]

type Props = {
  mobileOpen: boolean,
  handleDrawerToggle():void
}

export default function MenuLateral({mobileOpen, handleDrawerToggle}:Props) 
{
  const container = window !== undefined ? () => window.document.body : undefined;
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MyList items={listItems1} />
      <Divider />
      <MyList items={listItems2} />
    </div>
  );

  return (<Box
    component="nav"
    sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    aria-label="mailbox folders"
  >
    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
      }}
    >
      {drawer}
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>)
}