import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTeamDataContext } from '../../../../../Context/TeamDataProvider';
import Cookies from 'js-cookie';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Communications() {

  const team = useTeamDataContext();
  const [TeamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTeamData = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('access_token');
      const headers = { Authorization: token };
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/get-teams`, { headers });

      if (res.data.success === true) {
        team.updateTeamData(res.data.MyTeams)
        setTeamData(res.data.MyTeams);


      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      alert("Error fetching team data. Please try again later.");
    }
    setLoading(false)
  };

  useEffect(() => {
    if (team.teamData != null) {
      //store teamData into usestate variable
      setTeamData(team.teamData);
    }

    else {
      console.log("fetching...")
      //fetch it from server
      fetchTeamData();
    }
  }, [])

  return (
    <>
      <Typography variant='h3'>
        My teams
      </Typography>

      <Grid container spacing={2}>
        {
          TeamData.length != 0 ? (<>
            {
              TeamData.map((item, index) => {
                //console.log(item._id);
                return (<>
                  <Grid key = {index} item xs={4}>
                    <Card>
                      <CardActionArea onClick={()=>{
                        navigate(`chats/${item._id}`)
                      }}>
                        <CardContent>
                          <img src={item.TeamBannerURL} alt='image'
                            width={"100%"}
                          />
                         <div style={{
                          display : "flex",
                          alignItems :"center",
                          justifyContent : "space-between"
                         }}>
                         <Typography variant='h5' marginTop={1}>
                            {item.TeamName}
                          </Typography>

                          <Typography variant='h7'>
                             Members ({item.Members.length})
                          </Typography>
                         </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </>)
              })
            }
          </>) : (<>

          </>)
        }
      </Grid>

    </>
  )
}

export default Communications