import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

export default function ThumbnailComponent(props) {
  const { title, creator, url } = props;

  return (
    <Card>
      <CardActionArea>
        <img src={url} alt={title} style={{ width: '100%'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Creator: {creator}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
