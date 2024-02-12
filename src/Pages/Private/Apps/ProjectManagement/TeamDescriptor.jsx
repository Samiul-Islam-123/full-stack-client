import React, { useEffect, useState } from 'react';
import { useTeamDataContext } from '../../../../Context/TeamDataProvider';
import { useParams } from 'react-router-dom';
import TeamBanner from './Teams/TeamBanner/TeamBanner';
import TeamMembers from './Teams/TemMembers/TeamMembers';
import Productivity from './Teams/Productivity/Productivity';
import axios from "axios";
import { TextField, Autocomplete, Typography, Card, CardMedia, CardContent, CardActionArea, Button, IconButton, Icon, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchMember from './SearchMember';
import { useSocket } from '../../../../Context/SocketProvider';
import WhiteBoard from './Boards/WhiteBoard';
import ChatWindow from './Communications/ChatWindow/ChatWindow';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatDrawer from '../../../../Components/Drawer/ChatDrawer';
import Genius from '../Genius/Genius';

function TeamDescriptor() {

    const [collapse, setCollapse] = useState(false);
    const socket = useSocket();
    const navigate = useNavigate();
    const { TeamData, updateTeamData } = useTeamDataContext(); // Use the context
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);
    const [searchMember, setSearchMember] = useState(false);
    const { teamData } = useTeamDataContext();

    const [selectedOption, setSelectedOption] = useState(0)

    const { teamID } = useParams();
    const [currentTeam, setCurrentTeam] = useState(null)

    const [searchResultsReceived, setSearchResultsReceived] = useState(false);

// Callback function to trigger renderComponent
const handleSearchResultsReceived = () => {
  setSearchResultsReceived(true);
};

    const fetchTeamData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/get-teams-id/${teamID}`);

            console.log(res)
            if (res.data.success === true) {
                //updateTeamData(res.data.MyTeams)
                setCurrentTeam(res.data.MyTeams);

                //const teamNames = res.data.MyTeams.map(item => item.TeamName);
                //setOptions([...teamNames, "Create new Team"]);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching team data:", error);
            alert("Error fetching team data. Please try again later.");
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        //get the team data as per the given _id

        socket.emit('create-live-room', teamID)

        if (teamData) {
            const foundTeam = teamData.find(team => team._id === teamID);
            console.log('am here')
            setCurrentTeam(foundTeam);
        }

        else {
            fetchTeamData();
        }
    }, [])
    

    useEffect(() => {
        socket.on('response-join-team', data => {
            fetchTeamData()
        })
    }, [socket])

    const renderComponent = ()=>{
        return(<>
            <TeamMembers
                                            teamID = {teamID}
                                        />
        </>)
    }

    return (
        <>

            {
                currentTeam ? (<>

                    <IconButton style={{
                        marginLeft: "70vw",
                        marginBottom: "10px"
                    }}
                        onClick={() => {
                            setSearchMember(!searchMember)
                        }}
                    >
                        <Icon>
                            <AddIcon />
                        </Icon>
                    </IconButton>
                    Add member

                    {
                        searchMember ? (<>
                            <SearchMember TeamID={teamID} onSearchResultsReceived={handleSearchResultsReceived} />
                        </>) : null
                    }

                    <Grid container>
                        <Grid item md={collapse ? '11' : '8'}>

                        </Grid>
                        <Grid item md={collapse ? '1' : '4'}>
                            <div style={{
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "space-between",
                                paddingLeft: 50
                            }}>
                                <div>
                                    <IconButton onClick={() => {
                                        setCollapse(!collapse)
                                    }}>
                                        {
                                            collapse ? (<>
                                                <ArrowBackIosIcon />
                                            </>) : (<>
                                                <ArrowForwardIosIcon />
                                            </>)
                                        }
                                    </IconButton>
                                </div>

                                {
                                    !collapse ? (<>

                                        <div>
                                            <Button
                                                variant={selectedOption === 0 ? 'outlined' : null}
                                            onClick={()=>{
                                                setSelectedOption(0)
                                            }}>
                                                chats
                                            </Button>
                                            <Button variant={selectedOption === 1 ? 'outlined' : null} onClick={()=>{
                                                setSelectedOption(1)
                                            }}>
                                                Genius
                                            </Button>
                                            <Button variant={selectedOption === 2 ? 'outlined' : null} onClick={()=>{
                                                setSelectedOption(2)
                                            }}>
                                                Team members
                                            </Button>
                                        </div></>) : null
                                }


                            </div>
                        </Grid>
                    </Grid>

                    {
                        !collapse ? (<>
                            <Grid container>
                                <Grid item md={8}>
                                    <WhiteBoard />
                                </Grid>
                                <Grid item md={4} style={{position: "relative",paddingLeft: 50}}>

                                    {
                                        selectedOption == 0 ? (<><ChatWindow /></>) : null
                                    }

                                    {
                                        selectedOption == 1 ? (<><Genius /></>) : null
                                    }

                                    {
                                        selectedOption == 2 ? (<>{
                                            renderComponent()
                                        } </>) : null
                                    }

                                </Grid>
                            </Grid>
                        </>) : (<>
                            <Grid container>
                                <Grid item md={12}>
                                    <WhiteBoard />
                                </Grid>

                            </Grid>
                        </>)
                    }




                </>) : (<>
                    No data found
                </>)
            }
        </>
    )
}

export default TeamDescriptor