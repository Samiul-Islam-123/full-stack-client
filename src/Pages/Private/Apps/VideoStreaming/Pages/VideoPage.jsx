import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function VideoPage() {
    const { videoID } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchVideoData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/video-stream/video-data/${videoID}`);
            if (res.data.success === true)
                setVideoData(res.data.videoData);
            else
                alert(res.data.message);
        } catch (error) {
            console.error('Error fetching video data:', error);
            alert('Error fetching video data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVideoData();
    }, []);

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {videoData && (
                        <video controls src={videoData.downloadableVideoURL} style={{ width: '50%', height: 'auto' }} />
                    )}
                </>
            )}
        </>
    )
}

export default VideoPage;
