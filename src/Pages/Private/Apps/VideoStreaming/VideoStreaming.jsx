import React from 'react';
import NavBar from './NavBar/NavBar';
import ThumbnailComponent from './Feed/ThumnailComponent';
import Grid from '@mui/material/Grid';
import { Route, Routes } from 'react-router-dom';
import LikedVideos from './LikedVideos';
import MyVideos from './MyVideos';
import UploadVideo from './UploadVideo';

function VideoStreaming() {



  return (
    <>


      <NavBar />
      <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid><Grid item xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            title="Thumbnail 1"
            creator="Creator 1"
            url="https://www.shutterstock.com/shutterstock/photos/2276257889/display_1500/stock-photo-elegant-flat-lay-composition-in-grey-and-black-color-palette-with-textile-and-paint-samples-2276257889.jpg"
          />
        </Grid>
       

        
        {/* Add more ThumbnailComponent inside Grid items for additional thumbnails */}
      </Grid>
    </>
  );
}

export default VideoStreaming;
