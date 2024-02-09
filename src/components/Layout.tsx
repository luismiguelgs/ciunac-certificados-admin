import {Box, Toolbar, CssBaseline } from '@mui/material';
import MenuLateral from './MenuLateral';
import { DRAWER_WIDTH } from '../Services/constants';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MyAppBar, { IconMenu } from './MUI/MyAppBar';
import { SettingsIcon } from '../Services/icons';

export default function Layout()
{
    const navigate = useNavigate()
    const icons:IconMenu[] = [
        {
            label:"Opciones",
            icon: <SettingsIcon />,
            handleClick: () => navigate('/opciones')
        },
    ]

    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
        <Box sx={{ display: 'flex', }}>
          <CssBaseline />
          <MyAppBar 
            title='CIUNAC - CERTIFICADOS ADMIN'
            menuIcon={true}
            handleClickMenu={handleDrawerToggle}
            drawer={true}
            icons={icons}
          />
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