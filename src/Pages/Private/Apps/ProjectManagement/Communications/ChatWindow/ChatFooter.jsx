import { Icon, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useSocket } from '../../../../../../Context/SocketProvider';
import Cookies from 'js-cookie';

function ChatFooter(props) {

    const socket = useSocket();
    const [message, setMessage] = useState(null)

    const handleSendButtonClick = async()=>{
        setMessage("")
        socket.emit('chat-message', {
            sender : props.user_id,
            content : message,
            roomID : props.teamID,
            timestamp : new Date().getTime(),
            token : Cookies.get('access_token')
        })
    }

  return (
    <div style={{ position: 'fixed', bottom: 10, left: 0, width: '90%', padding: '10px', marginLeft : "8%",borderTop: '0.5px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
        onChange={(e)=>{
            setMessage(e.target.value)
        }}
          variant='outlined'
          label="Write your message here"
          fullWidth
          value={message}
          style={{ marginRight: '8px' }}
        />
        <IconButton onClick={handleSendButtonClick}>
          <Icon>
            <SendIcon />
          </Icon>
        </IconButton>
      </div>
    </div>
  );
}

export default ChatFooter;
