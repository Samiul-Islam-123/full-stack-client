import { Button, Card, CardActionArea, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

function SearchMember() {
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

    const handleRequestJoinTeam = (user) => {
        // Handle the request to join team for the selected user
        console.log(`Requesting ${user.username} to join the team`);
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
                        
                            <CardContent onClick={()=>{
                                console.log("Requesting to join...")
                            }} style={{
                                display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: ".5rem .75rem"
                            }}>{user.username}
                                <Button>Request to Join</Button>
                            </CardContent>
                        
                    ))}
                </Card>
            )}
        </>
    );
}

export default SearchMember;
