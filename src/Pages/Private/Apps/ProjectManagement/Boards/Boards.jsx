import React, { useState, useEffect } from 'react';
import { Button, Typography ,Container, Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../Context/SocketProvider';
import Cookies from 'js-cookie';

function Board() {

  const [currentPhrase, setCurrentPhrase] = useState("Let's paint the town 'live' with our interactive whiteboard – where imagination meets real-time collaboration! ");
  const navigate = useNavigate();
  const socket = useSocket();

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
    }, 30); // You can adjust the interval duration (in milliseconds) for the typing speed
  };

  useEffect(() => {
    AnimateWord(currentPhrase);
  }, []);

  useEffect(()=>{
    socket.on('roomID', roomId=>{
      navigate(`${roomId}`)
    })
  },[socket])

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
            <Typography variant='h3'>
              Live White Board
            </Typography>
            
            <Typography variant='subtitle1'>
              {currentPhrase}
            </Typography>
          </Grid>
          <Grid item md={6} textAlign={"center"}>
            <img
              src='https://img.freepik.com/free-vector/video-conferencing-concept-landing-page_52683-20175.jpg?size=626&ext=jpg&ga=GA1.1.1625179615.1706992925&semt=ais'
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
            socket.emit('create-live-room')
            
          }}>Start Live Board</Button>
          
        </div>

          </div>
      </Container>
    </>
  );
}

export default Board;
