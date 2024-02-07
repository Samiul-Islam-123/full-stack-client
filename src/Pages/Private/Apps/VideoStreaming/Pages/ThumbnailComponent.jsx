import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function ThumbnailComponent({ image, title, description }) {
  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
    </Card>
  );
}

export default ThumbnailComponent;
