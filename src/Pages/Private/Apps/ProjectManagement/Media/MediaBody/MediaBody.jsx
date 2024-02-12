import { Card, CardActionArea, CardContent, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function MediaBody(props) {
  const { files } = props;

  const handleDelete = (index) => {
    alert("Delete Option is currently unavailable :(")
  };

  return (
    <>
      {files ? (
        <>
          <Grid container spacing={2}>
            {files.map((item, index) => {
              console.log(item);
              const isImage = /\.(jpg|jpeg|png|gif)$/i.test(item.fileName);
              return (
                <Grid item sm={6} xs={12} md={4} key={index}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Card onClick={()=>{
                      window.open(item.contentURL)
                    }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <CardActionArea style={{ flexGrow: 1 }}>
                        {isImage ? (
                          <img
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src={item.contentURL}
                            alt={item.fileName}
                          />
                        ) : (
                          <CardContent>{item.fileName}</CardContent>
                        )}
                        
                      </CardActionArea>
                      
                        <CardContent>
                          <IconButton onClick={() => handleDelete(index)} aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      
                    </Card>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default MediaBody;
