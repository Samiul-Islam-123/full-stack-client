import { Button, Grid, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const information = [
    {
        app : "SkillSyncHub",
        title: "Freelance Marketplace",
        imageURL: "https://img.freepik.com/premium-vector/illustration-online-marketplace-with-shop-stall-selling-booths-search-compare-items-marketplace_4968-1239.jpg?w=1060",
        description: "Connect globally with skilled freelancers. Find the perfect match for your project and tap into diverse expertise."
    },

    {
        app : "StreamSphere",
        title: "Video Streaming Service",
        imageURL: "https://img.freepik.com/free-vector/illustration-human-avatar-using-technology_53876-17368.jpg?w=1380&t=st=1706286962~exp=1706287562~hmac=d6ba4b42da805779c46cf332fad3d5ae4b81ca2cdf8068e1b2359b6708bc2663",
        description: "Immerse yourself in crystal-clear video streaming. Showcase work, host webinars, or share insights flawlessly, captivating your audience every time."
    },

    {
        app : "FaceFlow",
        title: "Video Calling Service",
        imageURL: "https://img.freepik.com/free-vector/illustrated-best-friends-video-calling_23-2148504107.jpg?w=826&t=st=1706287001~exp=1706287601~hmac=0b34cd880962778b3b15d0a45a7076015121f3edc50793a7f31f0f459a8c05e1",
        description: "Break down barriers and unite your team virtually. Our video calling service ensures true collaboration with face-to-face interactions, minus the travel time."
    },

    {
        app : "TaskTrack",
        title: "Project Management System",
        imageURL: "https://img.freepik.com/free-vector/modern-project-management-concept_23-2147781912.jpg?t=st=1706288926~exp=1706289526~hmac=843b929b7ef9fd2b7b9c8a778f6abfe8232daa65a8b3ddbce37d5f77433dbb79",
        description: "Stay organized with our robust project management system. Track progress, manage deadlines, and foster collaboration effortlessly for streamlined and efficient projects."
    }
];


function Services() {

    const navigate = useNavigate();

    return (
        <>
            {
                information.map((item, index) => {
                    if (index % 2 != 0) {
                        return (<>
                            <div style={{
                                marginTop: "150px",
                                marginBottom: "150px"
                            }}>

                                <Grid container>
                                    <Grid item xs={12} sm={6} md={6} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <div>
                                            <Typography variant='h3'>
                                                {information[index].title}
                                            </Typography>

                                            <Typography variant='h6' style={{
                                                width: "600px"
                                            }}>
                                                {information[index].description}
                                            </Typography>
                                            <Button variant='contained' 
                                            onClick={()=>{
                                                navigate(`/apps`)
                                            }}
                                            style={{
                                                marginTop : "20px"
                                            }}>
                                                See More
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>

                                            <img
                                                src={information[index].imageURL}
                                                alt='image'
                                                style={{
                                                    maxWidth: "50%", // Ensure the image doesn't exceed its natural size
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                        </>)
                    }

                    else {

                        return (<>
                            <div style={{
                                marginTop: "150px",
                                marginBottom: "150px"
                            }}>

                                <Grid container>
                                    <Grid item xs={12} sm={6} >
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>

                                            <img
                                                src={information[index].imageURL}
                                                alt='image'
                                                style={{
                                                    maxWidth: "50%", // Ensure the image doesn't exceed its natural size
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <div>
                                            <Typography variant='h3'>
                                                {information[index].title}
                                            </Typography>

                                            <Typography variant='h6' style={{
                                                width: "600px"
                                            }}>
                                                {information[index].description}
                                            </Typography>
                                            <Button variant='contained' 
                                            onClick={()=>{
                                                navigate(`/apps`)
                                            }}
                                            style={{
                                                marginTop : "20px"
                                            }}>
                                                See More
                                            </Button>
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                        </>)

                    }


                })
            }
        </>
    )
}

export default Services