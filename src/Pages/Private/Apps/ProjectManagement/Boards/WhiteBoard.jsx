import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useSocket } from '../../../../../Context/SocketProvider';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function WhiteBoard() {
  const { roomId } = useParams();
  const [color, setColor] = useState('#000000');
  const [penRadius, setPenRadius] = useState(5); // Initial pen radius
  const [drawing, setDrawing] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);
  const [drawHistory, setDrawHistory] = useState([]);
    const [livecount, setLiveCount] = useState(0);
    const [message, setMessage] = useState("")

    const [open, setOpen] = useState(true);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  const socket = useSocket();

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // Set canvas drawing settings
    context.lineCap = 'round';
    context.lineWidth = penRadius;

    // Fill canvas with white color
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, [penRadius]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    setEraserMode(false); // Disable eraser mode when color changes
  };

  const handlePenRadiusChange = (value) => {
    setPenRadius(value);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const finishDrawing = () => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;

    context.closePath();
    setDrawing(false);

    // Save current drawing state for undo
    const drawData = context.getImageData(0, 0, canvas.width, canvas.height);
    setDrawHistory((prevHistory) => [...prevHistory, drawData]);
  };

  useEffect(() => {
    socket.on('user-joined-live-room', (data) => {
        setMessage(data.message)
        //alert(data.message);
    });

    socket.on('user-disconnected', (data) => {
      setMessage(`${data.username} has left the room`)
    });

    socket.on('get-drawing', (data) => {
      console.log(data);
      drawImage(data.imageUrl);
    });

    socket.on('live-members', data=>{
      console.log(data)
        setLiveCount(data.length)
    })
  }, [socket]);

  const drawImage = (imageUrl) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      context.drawImage(image, 0, 0, imageWidth, imageHeight);
    };
  };

  useEffect(() => {
    socket.emit('join-live-room', {
      token: Cookies.get('access_token'),
      roomId,
    });

    socket.emit('req-live-members',roomId);
  }, []);

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;

    const canvas = canvasRef.current;

    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;

    context.strokeStyle = eraserMode ? '#FFFFFF' : color;
    context.lineWidth = eraserMode ? penRadius * 2 : penRadius;

    context.lineTo(offsetX, offsetY);
    context.stroke();

    const imageDataUrl = canvas.toDataURL();
    socket.emit('drawing', {
      roomId,
      token: Cookies.get('access_token'),
      imageUrl: imageDataUrl,
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    setDrawHistory([]);
  };

  const undoDrawing = () => {
    if (drawHistory.length === 0) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;

    const lastDraw = drawHistory.pop();
    setDrawHistory([...drawHistory]);

    context.putImageData(lastDraw, 0, 0);
  };

  const copyURLToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        alert('URL copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

  return (
    <div>

<Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>

      <div style={{
        display : "flex",
        alignItems : "center",
        justifyContent : "space-between"
      }}>
      <input type="color" value={color} onChange={handleColorChange} />
      <Typography variant='h6'>
        live members ({livecount})
      </Typography>
      </div>
      <Slider
        value={penRadius}
        min={1}
        max={20}
        onChange={(event, value) => handlePenRadiusChange(value)}
      />
      <Button onClick={() => setEraserMode(!eraserMode)}>
        {eraserMode ? 'Disable Eraser' : 'Enable Eraser'}
      </Button>
      <Button onClick={clearCanvas}>Clear Canvas</Button>
      <Button onClick={undoDrawing}>Undo</Button>
      <Button onClick={copyURLToClipboard}>Copy URL</Button>
      
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default WhiteBoard;
