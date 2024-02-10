import { Button, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useState, useRef } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
  const [bannerImage, setBannerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
  const [TeamName, setTeamName] = useState("");
  const [TeamDescription, setTeamDescription] = useState("");
  const navigate = useNavigate();
  

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    setBannerImage(file);
    // Create a temporary URL for the selected image
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  };

  const handleButtonClick = () => {
    // Programmatically trigger the file input click event
    fileInputRef.current.click();
  };

  const CreateNewTeam = async()=>{
    setLoading(true);
    const token = Cookies.get('access_token');
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/project-management/create-team`,{
        token : token,
        TeamName : TeamName,
        TeamDescription : TeamDescription
    })
console.log(res)
    if(res.data.success === true)
    {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/project-management/create-chat-room`,{
        TeamID : res.data.teamID
      });
      if(response.data.success === true)
         navigate('/apps/project-management/my-teams')

         else{
          alert(response.data.message)
         }
    }

    else{
        console.log(res)
        alert(res.data.Message)
    }

    setLoading(false)
  }

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

      <Typography variant='h4'>
        Create your Team
      </Typography>

      <TextField 
      onChange={(e)=>{
        setTeamName(e.target.value)
      }}
        variant='outlined'
        label="Team Name" 
        fullWidth 
        margin="normal"
      />
      <TextField 
       onChange={(e)=>{
        setTeamDescription(e.target.value)
      }}
        variant='outlined'
        label="Team Description" 
        fullWidth 
        margin="normal"
      />
      {/* Hidden file input */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleBannerImageChange} 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
      />
      {/* Button to trigger file input */}
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleButtonClick} 
        style={{ marginTop: '10px' }}
      >
        Select Banner Image
      </Button>
      {/* Display the preview of the selected image */}
      {previewUrl && (
        <img 
          src={previewUrl} 
          alt="Selected Image" 
          style={{ maxWidth: '100%', marginTop: '10px' }} 
        />
      )}

      <Button variant='contained' marginTop = '20px' onClick={CreateNewTeam}>
        Create
      </Button>
    </>
  );
}

export default CreateTeam;
