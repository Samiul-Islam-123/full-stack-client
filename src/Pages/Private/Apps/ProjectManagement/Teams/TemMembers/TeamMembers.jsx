import { Card, Grid, Typography } from '@mui/material'
import React, { useEffect ,useState} from 'react'
import MemberCard from './MemberCard'
import axios from 'axios'

function TeamMembers(props) {
    

    const [currentTeam, setCurrentTeam] = useState(null)

    const fetchTeamData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/get-teams-id/${props.teamID}`);

            console.log(res)
            if (res.data.success === true) {
                console.log(res.data.MyTeams[0])
                setCurrentTeam(res.data.MyTeams[0]);

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

    useEffect(()=>{
        fetchTeamData();
    },[])

  return (
    <>

{
            currentTeam ? (<>
            <Typography variant='h4' style={{
            marginTop : "10px"
        }}>
            Team members ({currentTeam.Members.length})
        </Typography>
        
            <Grid container spacing={1} marginTop={1}>
                {currentTeam.Members.map(item=>{
                    console.log(item)
                    return (<>
                        <Grid item xs = {6}>  
                    <MemberCard 
                        name = {item.user.username}
                        role = {item.role}
                    />       
                </Grid>

                    </>)
                })}
               

            </Grid>
            </>) : null
        }
       
    </>
  )
}

export default TeamMembers