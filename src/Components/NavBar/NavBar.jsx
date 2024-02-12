import {Badge, Button, Icon, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ControlBar from '../Drawer/ControlBar';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNotification } from '../../Context/NotificationProvider';


function NavBar() {

    const navigate = useNavigate();
    const { notifications} = useNotification();

    console.log(notifications);


    return (
        <>
            <Toolbar>

                <Typography
                 onClick={() => {
                    navigate('/')
                }}
                variant='h4' style={{
                    flexGrow: "0.96",
                    cursor : "pointer"
                }}>
                    TB
                </Typography>

                <Button color='primary' onClick={() => {
                    navigate('/')
                }}>
                    Home
                </Button>

                <Button onClick={() => {
                    navigate('/apps/project-management/my-teams')
                }}>
                    Dashboard
                </Button>

               

               



                

                <IconButton onClick={() => {
                    navigate('/profile')
                }}>
                    <Icon>
                        <AccountCircleIcon />
                    </Icon>
                </IconButton>
            </Toolbar>
        </>
    )
}

export default NavBar