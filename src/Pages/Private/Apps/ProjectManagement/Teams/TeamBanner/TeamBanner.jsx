import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import React from 'react';



function TeamBanner(props) {

    const {TeamName, TeamBannerURL, TeamDescription} = props;

  return (
    <>
      <Card>
        
        <CardMedia
        sx={{ height: 300 }}
        image={TeamBannerURL}
        title="green iguana"
      />
       <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {TeamName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {TeamDescription}
        </Typography>
      </CardContent>
      </Card>
    </>
  );
}

export default TeamBanner;
