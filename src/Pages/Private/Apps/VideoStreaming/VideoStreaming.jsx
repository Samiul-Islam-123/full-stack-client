import React, { useEffect } from 'react'
import NavBar from "./NavBar/NavBar"
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import MyVideo from './Pages/MyVideo'
import LikedVideos from './Pages/LikedVideos'
import UploadVideo from './Pages/UploadVideo'
import Feed from './Pages/Feed'

function VideoStreaming() {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate('feed')
  },[])

  return (
    <>
      <NavBar />

<Routes>
  
<Route exact path='/feed' element={<Feed feedURL = {`${process.env.REACT_APP_API_URL}/api/video-stream/feed`}/>} />
  
  <Route exact path='/my-video' element={<MyVideo />} />
  <Route exact path='/liked-video' element={<LikedVideos />} />
  <Route exact path='/upload-video' element={<UploadVideo />} />
  
</Routes>

    </>
  )
}

export default VideoStreaming