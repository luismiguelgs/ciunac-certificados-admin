import {List, ListItem, ListItemButton, ListItemIcon, Divider, ListItemText, Toolbar, Box, Drawer} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TaskIcon from '@mui/icons-material/Task';
import { DRAWER_WIDTH } from '../Services/constants';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BuildIcon from '@mui/icons-material/Build';

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
      <List>
          <ListItem key={0} disablePadding component={Link} to="/" color="inherit">
            <ListItemButton>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='Inicio'/>
            </ListItemButton>  
          </ListItem>
          <ListItem key={1} disablePadding component={Link} to="/certificados?estado=NUEVO" color="inherit">
            <ListItemButton>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary='Solicitudes Nuevas'/>
            </ListItemButton>
          </ListItem>
          <ListItem key={2} disablePadding component={Link} to="/certificados?estado=ELABORADO" color="inherit">
            <ListItemButton>
              <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
              <ListItemText primary='Solicit. Elaboradas'/>
            </ListItemButton>
          </ListItem>
          <ListItem key={3} disablePadding component={Link} to="/certificados?estado=ENTREGADO" color="inherit">
            <ListItemButton>
              <ListItemIcon><TaskIcon /></ListItemIcon>
              <ListItemText primary='Solicit. Entregadas'/>
            </ListItemButton>
          </ListItem>
          
      </List>
      <Divider />
      <List>
      <ListItem key={0} disablePadding component={Link} to="/reportes" color="inherit">
            <ListItemButton>
              <ListItemIcon><SummarizeIcon /></ListItemIcon>
              <ListItemText primary='Reportes'/>
            </ListItemButton>
          </ListItem>
        <ListItem key={1} disablePadding component={Link} to="/solicitud-nueva" color="inherit">
            <ListItemButton>
              <ListItemIcon><NoteAddIcon /></ListItemIcon>
              <ListItemText primary='Nueva Solicitud'/>
            </ListItemButton>
        </ListItem>
        <ListItem key={2} disablePadding component={Link} to="/opciones" color="inherit">
          <ListItemButton>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary='Opciones'/>
          </ListItemButton>
        </ListItem>
        <ListItem key={3} disablePadding component={Link} to="/mantenimiento" color="inherit">
          <ListItemButton>
            <ListItemIcon><BuildIcon /></ListItemIcon>
            <ListItemText primary='Mantenimiento'/>
          </ListItemButton>
        </ListItem>
      </List>
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