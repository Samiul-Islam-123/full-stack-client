import { Button, Card, CardActionArea, CardContent, Divider, Icon, IconButton, Toolbar } from '@mui/material'
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from 'react-router-dom';

function NavBar() {

const navigate = useNavigate();

  return (
    <>
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
            

            <Button onClick={()=>{
                navigate('my-video')
            }}>MY Videos</Button>
            <Button onClick={()=>{
                navigate('liked-video')
            }}>Liked Videos</Button>
            <Button onClick={()=>{
                navigate('upload-video')
            }}>Upload Video</Button>
            
        </Toolbar>
        <Divider />
    </>
  )
}

export default NavBar
