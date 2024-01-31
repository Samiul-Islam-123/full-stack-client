import { Card, CardActionArea, CardContent, Grid, Icon, Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function AppController() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Routes>
        <Route exact path='/SkillSyncHub' element={<>Freelance Marketplace</>} />
        <Route exact path='/StreamSphere' element={<>Video Streaming</>} />
        <Route exact path='/FaceFlow' element={<>Video calling</>} />
        <Route exact path='/TaskTrack' element={<>Project Management</>} />
      </Routes>

      <Card>
        <Grid container style={{ width: '100%', height: '100%',
        padding : "50px"
      }}>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding : "20px" }}>
            <Card style={{ width: 'auto', height: '80%' }}>
              <CardActionArea>
                <CardContent>
                  <Icon>
                    <StorefrontIcon />
                  </Icon>
                  <Typography variant='h6' style={{
                    marginTop : "10px"
                  }}>
                  SkillSyncHub
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,  padding : "20px"}}>
            <Card style={{ width: 'auto', height: '80%' }}>
              <CardActionArea>
                <CardContent>
                <Icon>
                    <SmartDisplayIcon />
                  </Icon>
                  <Typography variant='h6' style={{
                    marginTop : "10px"
                  }}>
                  StreamSphere
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Grid container style={{ width: '100%', height: '100%', 
        padding : "50px"
      }}>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  padding : "20px" }}>
            <Card style={{ width: '80%', height: '80%' }}>
              <CardActionArea>
                <CardContent>
                <Icon>
                    <VideoCallIcon />
                  </Icon>
                  <Typography variant='h6' style={{
                    marginTop : "10px"
                  }}>
                  FaceFlow
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  padding : "20px" }}>
            <Card style={{ width: '80%', height: '80%' }}>
              <CardActionArea>
                <Icon>
                    <StorefrontIcon />
                  </Icon>
                <CardContent>
                <Typography variant='h6' style={{
                    marginTop : "10px"
                  }}>
                  TaskTrack
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default AppController
