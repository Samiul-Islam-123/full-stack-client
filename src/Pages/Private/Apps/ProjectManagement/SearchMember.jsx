import { Button, Card, CardActionArea, CardContent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSocket } from '../../../../Context/SocketProvider';
import MySnackBar from '../../../../Components/Snakbar/MySnakBar';
import MySnakBar from '../../../../Components/Snakbar/MySnakBar';
import { useNotification } from '../../../../Context/NotificationProvider';

function SearchMember(props) {

    const {addNotification} = useNotification();
    const socket = useSocket();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchQuery = async (e) => {
        const searchQuery = e.target.value.trim();

        if (searchQuery !== '') {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/search-user/${searchQuery}`);
                setSearchResults(response.data.UsersFound); // Assuming the response contains UsersFound array
            } catch (error) {
                console.error('Error searching for user:', error);
                // Handle error
            }
        } else {
            setSearchResults([]); // Clear search results if search query is empty
        }

        setSearch(searchQuery); // Update the search state
    };

    


    return (
        <>
            <TextField
                onChange={handleSearchQuery}
                variant="outlined"
                label="Search a user by name or ID to add in this team"
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            {/* Display search results */}
            {searchResults.length > 0 && (
                <Card style={{ marginBottom: '10px' }}>
                    <Typography variant="h6">Search Results:</Typography>
                    {searchResults.map((user) => (
                        
                            <CardContent  style={{
                                display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: ".5rem .75rem"
                            }}>{user.username}
                                <Button onClick={async()=>{
                                    const token = Cookies.get('access_token');

                                    const payload = {
                                        token : token,
                                        receiverID : user._id,
                                        TeamID : props.TeamID
                                    }
                            
                                   socket.emit('request-join-team', payload);
                                }}>Request to Join</Button>
                            </CardContent>
                        
                    ))}
                </Card>
            )}
        </>
    );
}

export default SearchMember;
