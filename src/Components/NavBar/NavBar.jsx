import { Button, Icon, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ControlBar from '../Drawer/ControlBar';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


function NavBar() {

    const navigate = useNavigate();

    return (
        <>
            <Toolbar>
                <ControlBar>
                    <IconButton>
                        <Icon>
                            <DensityMediumIcon />
                        </Icon>
                    </IconButton>
                </ControlBar>

                <Typography variant='h4' style={{
                    flexGrow: "0.96"
                }}>
                    TB
                </Typography>

                <Button color='primary' onClick={() => {
                    navigate('/')
                }}>
                    Home
                </Button>

                <Button onClick={() => {
                    navigate('/apps/dashboard')
                }}>
                    Apps
                </Button>

                <Button onClick={() => {
                    navigate('/aboutus')
                }}>
                    About Us
                </Button>

                <IconButton onClick={() => {
                    navigate('/ai')
                }}>
                    <Icon>
                        <AutoAwesomeIcon />
                    </Icon>
                </IconButton>

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