import React, { useEffect, useState } from 'react';
import { useTeamDataContext } from '../../../../Context/TeamDataProvider';
import { useParams } from 'react-router-dom';
import TeamBanner from './Teams/TeamBanner/TeamBanner';
import TeamMembers from './Teams/TemMembers/TeamMembers';
import Productivity from './Teams/Productivity/Productivity';
import axios from "axios";
import { TextField, Autocomplete, Typography, Card, CardMedia, CardContent, CardActionArea, Button, IconButton, Icon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchMember from './SearchMember';

function TeamDescriptor() {

    const navigate = useNavigate();
    const { TeamData, updateTeamData } = useTeamDataContext(); // Use the context
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);
    const [searchMember, setSearchMember] = useState(false);
    const { teamData } = useTeamDataContext();

    const { teamID } = useParams();
    const [currentTeam, setCurrentTeam] = useState(null)

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

        if (teamData) {
            const foundTeam = teamData.find(team => team._id === teamID);
console.log('am here')
            setCurrentTeam(foundTeam);
        }

        else {
            fetchTeamData();
        }
    },[])

    return (
        <>

            {
                currentTeam ? (<>
                
                <IconButton style={{
                    marginLeft : "70vw",
                    marginBottom : "10px"
                }} 
                onClick={()=>{
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
                    <SearchMember />
                </>) : null
}


                    <TeamBanner 
                        TeamName = {currentTeam.TeamName}
                        TeamBannerURL = {currentTeam.TeamBannerURL}
                        TeamDescription = {currentTeam.TeamDescription}
                    />
                    <TeamMembers 
                    Members = {currentTeam.Members}
                    />
                    <Productivity />
                </>) : (<>
                    No data found
                </>)
            }
        </>
    )
}

export default TeamDescriptor