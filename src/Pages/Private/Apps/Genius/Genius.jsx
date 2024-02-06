import { Container, Typography, Paper } from '@mui/material';
import React from 'react';

function Genius() {
  // Assume messages are received from an API
  const messages = [
    { text: 'Hello!', sender: 'Genius' },
    { text: 'Hi there!', sender: 'User' },
    { text: 'How can I help you today?', sender: 'Genius' },
  ];

  return (
    <Container>
      <Typography variant="h4" align="center">
        Talk to Genius
      </Typography>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {messages.map((message, index) => (
          <Paper
            key={index}
            style={{
              maxWidth: '70%',
              margin: '0 auto',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor:
                message.sender === 'Genius' ? '#f0f0f0' : '#c0c0c0',
              textAlign: message.sender === 'Genius' ? 'left' : 'right',
              color: '#000', // Set text color to black
            }}
            elevation={3}
          >
            <Typography variant="body1">{message.text}</Typography>
          </Paper>
        ))}
      </div>
    </Container>
  );
}

export default Genius;
