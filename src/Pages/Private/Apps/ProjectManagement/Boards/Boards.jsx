import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../Context/SocketProvider';
import Cookies from 'js-cookie';

function Boards() {

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
    }, 50); // You can adjust the interval duration (in milliseconds) for the typing speed
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
      <Typography variant='h3'>
        Live Boards
      </Typography>

      <Typography variant='h7'>
        {currentPhrase}
      </Typography>
<br></br>
      <Button style={{
       marginTop : "150px"
      }} variant='outlined' onClick={() => {
        socket.emit('create-live-room')
      }}>
        Start Live Board
      </Button>
    </>
  );
}

export default Boards;
