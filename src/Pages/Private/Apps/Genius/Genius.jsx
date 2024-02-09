import { Container, Typography, Paper, Card, CardContent, TextField } from '@mui/material';
import React from 'react';

function Genius() {
  // Assume messages are received from an API
  const messages = [
    { text: 'Hello!', sender: 'Genius' },
    { text: 'Hi there!', sender: 'User' },
    { text: 'How can I help you today?', sender: 'Genius' },
  ];

  return (
    <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Typography variant="h4" align="center" marginBottom={"10px"}>
        Talk with Genius
      </Typography>
      <div style={{
        height : "80vh",
        overflow : "auto"
      }}>
      <Card style={{
      width : "fit-content",
      padding : "5px"
     }}>
      <CardContent>
        <Typography variant='h7'>
          this is Genius's message 
        </Typography>
      </CardContent>
     </Card>

    


      </div>
      <TextField
        label="Ask anything to Genius"
        fullWidth
        style={{ marginBottom: '20px' }}
      />
    </Container>
  );
}

export default Genius;
