import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FreelanceMarketPlace from './FreelanceMarketPlace/FreelanceMarketPlace';
import VideoCalling from './VideoCalling/VideoCalling';
import ProjectManagement from './ProjectManagement/ProjectManagement';
import Cookies from 'js-cookie';
import Dashboard from './Dashboard/Dashboard';
import ControlBar from '../../../Components/Drawer/ControlBar';
import { Icon, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MeetingScreen from './VideoCalling/MeetingScreen';
import Genius from './Genius/Genius';
import VideoStreaming from './VideoStreaming/VideoStreaming';

function AppController() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    // this function will check authentication
    const token = Cookies.get('access_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {isAuthenticated && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<FreelanceMarketPlace />} />
          <Route exact path="/video-stream/*" element={<VideoStreaming />} />
          <Route path="/video-call" element={<VideoCalling />} />
          <Route path="/video-call/:id" element={<MeetingScreen />} />
          <Route
            path="/project-management/*"
            element={<ProjectManagement />}
          />
          <Route path="/genius" element={<Genius />} />
        </Routes>
      )}
    </>
  );
}

export default AppController;
