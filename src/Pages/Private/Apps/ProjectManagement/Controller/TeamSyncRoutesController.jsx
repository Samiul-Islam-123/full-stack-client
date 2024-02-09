import React from 'react';
import {Routes ,Route} from "react-router-dom"
import Teams from '../Teams/Teams';
import Communications from '../Communications/Communications';
import Boards from '../Boards/Boards';
import Media from '../Media/Media';
import TeamDescriptor from '../TeamDescriptor';
import CreateTeam from '../CreateTeam/CreateTeam';

function TeamSyncRoutesController() {
  return (
    <>
    <div style={{
        marginRight : "50px"
    }}>

    <Routes>
        <Route exact path='/my-teams' element={<Teams />}/>
        <Route exact path='/my-teams/:teamID' element={<TeamDescriptor />}/>
        <Route exact path='/my-teams/create-team' element={<CreateTeam />}/>
        
        
        <Route exact path='/communications' element={<Communications />}/>
        <Route exact path='/boards' element={<Boards />}/>
        <Route exact path='/media' element={<Media />}/>
        
    </Routes>
    </div>
    </>
  )
}

export default TeamSyncRoutesController