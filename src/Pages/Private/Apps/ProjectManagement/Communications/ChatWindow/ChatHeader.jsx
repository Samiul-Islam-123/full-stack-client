import { Card, Typography } from '@mui/material'
import React from 'react'

function ChatHeader(props) {

    const {imageURL, TeamName, members} = props;
    //console.log(props)

  return (
    <>
        <Card style={{
            display : "flex",
            alignItems : "center",
            padding : "10px"
        }}>
            <div style={{
                flexGrow : "0.03",
                display : "flex",
                marginLeft : "10px",
                alignItems : "center"
            }}>
                <img src={imageURL} alt='team image' width={100}/>
            </div>

            <div>
                <Typography variant='h5'>
                    {TeamName}
                </Typography>
                <Typography>
                    Members: {members}
                </Typography>
            </div>
        </Card>
    </>
  )
}

export default ChatHeader