import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography
} from '@mui/material';
import Cookies from "js-cookie"
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Backdrop from '@mui/material/Backdrop';


function UploadVideo() {

  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setSelectedThumbnail(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    const token = Cookies.get('access_token');
    console.log(token)
    formData.append('token', token)
    formData.append('video', selectedVideo);
    formData.append('thumbnail', selectedThumbnail);
    formData.append('title', title);
    formData.append('description', description);

    try {
        const requestData = {
            token: token
        };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/video-stream/upload`, formData, 
      requestData
      ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        
      });
      console.log(response.data); // Handle response from server
    } catch (error) {
      console.error('Error uploading video:', error);
    }
    setLoading(false);
  };

  return (
    <Container>

<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Upload Your Video
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" component="label">
              Upload Video File
              <input hidden type="file" onChange={handleVideoChange} />
            </Button>
            {selectedVideo && (
              <Typography variant="caption">{selectedVideo.name}</Typography>
            )}
            
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" component="label">
              Upload Thumbnail
              <input hidden type="file" accept="image/*" onChange={handleThumbnailChange} />
            </Button>
            {selectedThumbnail && (
              <img
                src={URL.createObjectURL(selectedThumbnail)}
                alt="Thumbnail Preview"
                style={{ width: 500, height: "auto", objectFit: 'cover' }}
              />
            )}
          </div>
          <TextField
            variant="outlined"
            label="Enter Video Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            variant="outlined"
            label="Enter Video Description"
            fullWidth
            multiline
            value={description}
            onChange={handleDescriptionChange}
          />
          
          {/* Add your logic for upload functionality here */}
          <Button
            variant="contained"
            onClick={handleUpload}
            fullWidth
            disabled={!selectedVideo || !selectedThumbnail || !title || !description}
          >
            Upload
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default UploadVideo;
