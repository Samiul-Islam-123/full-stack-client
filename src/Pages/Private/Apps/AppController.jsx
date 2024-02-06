import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useNavigation } from 'react-router-dom'
import FreelanceMarketPlace from './FreelanceMarketPlace/FreelanceMarketPlace'
import VideoStreaming from './VideoStreaming/VideoStreaming'
import VideoCalling from './VideoCalling/VideoCalling'
import ProjectManagement from './ProjectManagement/ProjectManagement';
import Cookies from 'js-cookie'
import Dashboard from './Dashboard/Dashboard'
import ControlBar from '../../../Components/Drawer/ControlBar'
import { Icon, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MeetingScreen from './VideoCalling/MeetingScreen'
import LikedVideos from './VideoStreaming/LikedVideos'
import MyVideos from './VideoStreaming/MyVideos'
import UploadVideo from './VideoStreaming/UploadVideo'
import Genius from './Genius/Genius'

function AppController() {

  const navigate = useNavigate();

  const checkAuth = () => {
    // this function will check authentication
    const token = Cookies.get('access_token');
    if (!token)
      navigate('/login')
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<FreelanceMarketPlace />} />
        
        
        <Route exact path="/video-stream" element={<VideoStreaming />} />
        <Route exact path="/video-stream/liked-video" element={<LikedVideos />} />
        <Route exact path="/video-stream/my-video" element={<MyVideos />} />
        <Route exact path="/video-stream/upload-video" element={<UploadVideo />} />
        

        <Route path="/video-call" element={<VideoCalling />} />
        <Route path="/video-call/:id" element={<MeetingScreen />} />
        
        <Route path="/project-management" element={<ProjectManagement />} />

        <Route path="/genius" element={<Genius />} />


      </Routes>

    </>
  )
}

export default AppController