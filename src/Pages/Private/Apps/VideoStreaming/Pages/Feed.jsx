import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ThumbnailComponent from './ThumbnailComponent';
import axios from 'axios';

function Feed(props) {

    const [thumbnails, setThumbnails] = useState(null)

    const fetchFeed = async() =>{
        const response = await axios.get(`${props.feedURL}`);
      //  console.log(response.data.feedData)
        if(response.data.success){
            setThumbnails(response.data.feedData)
        }
        else{
            alert("Something is wrong :(");
            console.log(response)
        }
    }

    useEffect(()=>{
fetchFeed();
    },[])

  // Sample data for thumbnails
  

  return (
    <Grid container spacing={3}>
      {thumbnails ? (<>
      
        {thumbnails.map(thumbnail => (
        <Grid item key={thumbnail._id} xs={12} sm={6} md={4} lg={3}>
          <ThumbnailComponent
            image={thumbnail.thumbnailURL}
            title={thumbnail.title}
            description={thumbnail.description}
          />
        </Grid>
      ))}

      </>) : null}
    </Grid>
  );
}

export default Feed;
