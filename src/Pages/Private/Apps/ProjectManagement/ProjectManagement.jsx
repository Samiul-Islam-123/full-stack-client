import React, { useState } from 'react';
import TeamSyncRoutesController from './Controller/TeamSyncRoutesController';
import { Button, Grid, Icon, IconButton } from "@mui/material"
import LeftControlBar from './LeftControlBar/LeftControlBar';
import TuneIcon from '@mui/icons-material/Tune';

function ProjectManagement() {

  const [collapseControllBar, setCollapseControllBar] = useState(false);

  return (
    <>
        <IconButton style={{
          marginLeft : "25px"
        }}>
          <Icon>
            <TuneIcon onClick={() => setCollapseControllBar(!collapseControllBar)} />
          </Icon>
        </IconButton>

      <Grid container>


        <Grid item xs={
          collapseControllBar ? "1":"2"
        }>
          <LeftControlBar collapseState = {collapseControllBar}/>
        </Grid>

        <Grid item xs={
          collapseControllBar ? "11" : "10"
        }>
          <TeamSyncRoutesController />
        </Grid>
      </Grid>


    </>
  )
}

export default ProjectManagement