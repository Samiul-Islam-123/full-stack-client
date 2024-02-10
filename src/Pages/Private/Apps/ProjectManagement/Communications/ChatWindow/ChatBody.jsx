import { Card, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../../../../../Context/SocketProvider';
import axios from 'axios';
import Cookies from 'js-cookie';

function ChatBody(props) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socket.on('chat-broadcasting', data => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          senderID: data.data.sender,
          sender: data.userData.username,
          content: data.data.content,
          timestamp: data.data.timestamp
        }
      ]);
    });
  }, [socket]);

  const fetchchats = async()=>{
    const token = Cookies.get('access_token')
    const chatsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/get-chats/${props.teamID}`,{headers:{
        Authorization : `${token}`
    }})
    if(chatsResponse.data.success === true){
        var tempData = [];
        chatsResponse.data.chats.forEach((message)=>{
            tempData.push({
                senderID : message.sender._id,
                sender : message.sender.username,
                content : message.content,
                timestamp : message.timestamp
            })
        })
        setMessages(tempData);
    }
  }

  useEffect(()=>{
fetchchats()
  },[])


  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format the timestamp to a string
  }

  return (
    <div ref={chatContainerRef} style={{
      height: "68vh",
      overflow: "auto",
      scrollBehavior : "smooth"
    }}>
      {messages.map((message, index) => (
        <div key={index}>
          <Card style={{
            marginLeft: message.senderID === props.myID ? "auto" : "initial",
            marginTop: "10px",
            marginBottom: "10px",
            width: 'fit-content',
            padding: "10px"
          }}>
            <Typography variant='h8'>
              {message.sender}
            </Typography>
            <Typography variant='h6'>
              {message.content}
            </Typography>
            <Typography variant='caption' marginLeft={"auto"}>
              {formatTime(message.timestamp)}
            </Typography>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default ChatBody;
