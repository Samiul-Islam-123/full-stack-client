import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

function ThumbnailComponent({ image, title, description ,ID}) {
  
  const navigate = useNavigate();

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardActionArea onClick={()=>{
        navigate('/apps/video-stream/stream/'+ID)
      }}>

      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        style={{ objectFit: 'cover' }}
        />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
        </CardActionArea>
    </Card>
  );
}

export default ThumbnailComponent;
