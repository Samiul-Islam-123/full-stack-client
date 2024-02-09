import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useNavigate } from 'react-router-dom';


function LeftControlBar(props) {

    const navigate = useNavigate();

    return (
        <>
            <Container>

                <List>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('my-teams')
                        }}>
                            <ListItemIcon>
                                <GroupsIcon />
                            </ListItemIcon>
                            {
                                !props.collapseState ? (<>
                                    <ListItemText primary="My Teams" />
                                </>) : null
                            }
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('communications')
                        }}>
                            <ListItemIcon>

                                <MessageIcon />
                            </ListItemIcon>
                            {
                                !props.collapseState ? (<>
                                    <ListItemText primary="Communications" />
                                </>) : null
                            }
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('boards')
                        }}>
                            <ListItemIcon>
                                <FilterFramesIcon />

                            </ListItemIcon>
                            {
                                !props.collapseState ? (<>
                                    <ListItemText primary="white Boards" />
                                </>) : null
                            }
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('media')
                        }}>
                            <ListItemIcon>

                                <PermMediaIcon />
                            </ListItemIcon>
                            {
                                !props.collapseState ? (<>
                                    <ListItemText primary="Media" />
                                </>) : null
                            }
                        </ListItemButton>
                    </ListItem>

                </List>
            </Container>
        </>
    )
}

export default LeftControlBar