import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../../../Utils/Socket';

function VideoCalling() {

  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState("Elevating connections with crystal-clear video magic. ")
  const [roomIdInput, setRoomIdInput] = useState(null);
  const [showTextField, setTextField] = useState(false);
  const [currentRoomID, setCurrentRoomID] = useState("");

  const AnimateWord = (text) => {
    const words = text.split(' ');
    let currentWord = 0;
    let currentLetter = 0;



    const interval = setInterval(() => {
        setCurrentPhrase(prevPhrase => {
            let animatedText = "";

            for (let i = 0; i <= currentWord; i++) {
                const word = words[i];
                const displayLetters = (i === currentWord) ? word.slice(0, currentLetter + 1) : word;
                animatedText += displayLetters + ((i < currentWord) ? ' ' : '');
            }

            return animatedText;
        });

        currentLetter++;

        if (currentLetter === words[currentWord].length) {
            currentLetter = 0;
            currentWord++;
        }

        if (currentWord === words.length) {
            clearInterval(interval);
        }
    }, 60); // You can adjust the interval duration (in milliseconds) for the typing speed
};



useEffect(()=>{
    AnimateWord(currentPhrase)
   
     socket.on('new-meeting_response', data=>{
       navigate(data.RoomID)
     })
},[])

  return (
    <>
      <Container style={{
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        height : "90vh"
      }}>
        <div>

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item md={6}>
            <Typography variant='h5'>
              Welcome to
            </Typography>
            <Typography variant='h1'>
              EchoTalk,
            </Typography>
            <Typography variant='subtitle1'>
              {currentPhrase}
            </Typography>
          </Grid>
          <Grid item md={6} textAlign={"center"}>
            <img
              src='https://img.freepik.com/free-vector/friends-during-video-conference-online-bar-chat_107791-13352.jpg?w=1380&t=st=1706993861~exp=1706994461~hmac=59b219da8ca3e81dc088fbeb97c8a00e4af654cd8bcf54b204326bba89fae153'
              alt="Image"
              width="90%"
              />
          </Grid>
        </Grid>

        <div style={{
          
          display: "flex",
          flexDirection: "column",  // Stack buttons vertically
          alignItems: "center",      // Center items horizontally
          marginTop: "100px",
        }}>
          <Button variant='outlined' style={{ marginBottom: '10px' }} onClick={()=>{
            socket.emit('new-meeting_request', {
              name : "Samiul"
            })
            
          }}>Create new Meeting</Button>
          
        </div>

          </div>
      </Container>
    </>
  );
}

export default VideoCalling;
