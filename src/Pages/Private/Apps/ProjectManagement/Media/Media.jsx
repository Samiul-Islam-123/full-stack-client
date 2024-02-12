import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import MediaBody from './MediaBody/MediaBody';
import Cookies from 'js-cookie';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Media() {
  const [loading, setLoading] = useState(false);
  const [Files, SetFiles] = useState(null)

  const fetchMyFiles = async () => {
    setLoading(true);
    const token = Cookies.get('access_token');
    //console.log(token)
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/get-files/${token}`,);

    if (response.data.success === true) {
      SetFiles(response.data.files)
    }

    else {
      alert(response.data.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMyFiles();
  }, [])

  const handleFileUpload = async (event) => {
    setLoading(true)
    const files = event.target.files;

    if (files.length > 0) {
      const formData = new FormData();

      // Append each file to the FormData object
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      // Append additional data if needed
      formData.append('token', Cookies.get('access_token'))
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/project-management/add-media`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Handle success
          const data = await response.json();
          if (data.success === true) {
            await fetchMyFiles();
          }
        } else {
          // Handle error
          console.error('Media upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading media:', error);
      }
    }

    setLoading(false)
  };

  const handleClose = () => {
    setLoading(false);
  };
 

  return (
    <>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant='h3' padding={1}>
        My Files
      </Typography>

      <input
        multiple
        type="file"
        style={{ display: 'none', marginBottom: "10px" }}
        onChange={handleFileUpload}
        id="fileInput"
      />
      {/* Button to trigger file selection */}
      <Button variant="outlined" component="label" htmlFor="fileInput">
        Upload File
      </Button>
      {
        Files ? (<>

          <MediaBody files={Files} />

        </>) : (<>

          No files found :(</>)
      }
    </>
  );
}

export default Media;
