import React, { useState } from 'react';
import TeamSyncRoutesController from './Controller/TeamSyncRoutesController';
import { Button, Container, Grid, Icon, IconButton } from "@mui/material"
import LeftControlBar from './LeftControlBar/LeftControlBar';
import TuneIcon from '@mui/icons-material/Tune';

function ProjectManagement() {

  const [collapseControllBar, setCollapseControllBar] = useState(true);

  return (
    <>




          <TeamSyncRoutesController />

        
        


    </>
  )
}

export default ProjectManagement