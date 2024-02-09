import React, { useEffect, useState } from 'react';
import TeamBanner from './TeamBanner/TeamBanner';
import TeamMembers from './TemMembers/TeamMembers';
import Productivity from './Productivity/Productivity';
import { TextField, Autocomplete, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useTeamDataContext } from '../../../../../Context/TeamDataProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


function Teams() {
  const [loading, setLoading] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const { TeamData, updateTeamData } = useTeamDataContext(); // Use the context


  const handleChange = (event, newValue) => {

    if(newValue === 'Create new Team')
    navigate('create-team')

    else{

      const foundValue = teamData.find(team => (newValue === team.TeamName));
      navigate(foundValue._id)
      setValue(newValue);
    }
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true)
      try {
        const token = Cookies.get('access_token');
        const headers = { Authorization: token };
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/get-teams`, { headers });

        if (res.data.success === true) {
          updateTeamData(res.data.MyTeams)
          setTeamData(res.data.MyTeams);

          const teamNames = res.data.MyTeams.map(item => item.TeamName);
          setOptions([...teamNames, "Create new Team"]);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        alert("Error fetching team data. Please try again later.");
      }
      setLoading(false)
    };

    fetchTeamData();
  }, []);

  return (
    <>

      {loading ? (<>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>) : null}

      <Autocomplete
        style={{ marginBottom: "10px" }}
        value={value}
        onChange={handleChange}
        options={options}
        renderInput={(params) => <TextField {...params} label="Teams" />}
      />
      {teamData ? (
        <>
          {
            teamData.map(item => {
              //console.log(item)
              return (<>
                <Card style={{
                  marginTop: "10px",
                  marginBottom: "10px"
                }}>
                  <CardActionArea onClick={() => {
                    navigate(`${item._id}`)
                  }}>

                    <CardMedia
                      sx={{ height: 300 }}
                      image={item.TeamBannerURL}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.TeamName}
                      </Typography>

                    </CardContent>
                  </CardActionArea>
                </Card>
              </>)
            })
          }
        </>
      ) : (
        <Typography>No teams found</Typography>
      )}
    </>
  );
}

export default Teams;
