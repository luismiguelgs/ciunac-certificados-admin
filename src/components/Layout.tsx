import {Box, Toolbar, CssBaseline, AppBar, IconButton, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuLateral from './MenuLateral';
import { DRAWER_WIDTH } from '../Services/constants';
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout()
{
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
        <Box sx={{ display: 'flex', }}>
          <CssBaseline />
          <AppBar 
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                CIUNAC - CERTIFICADOS ADMIN
              </Typography>
            </Toolbar>
          </AppBar>
          <MenuLateral mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      );
}