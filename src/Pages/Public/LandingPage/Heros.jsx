import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate} from 'react-router-dom';

const phrases = [
    {
        title : "marketplace",
        phrase : "Where global talent converges for your projects."
    },

    {
        title : "video_streaming",
        phrase : "Where your brilliance comes to life through crystal-clear streaming."
    },

    {
        title : "vide_calling",
        phrase : "Where professional connections transcend distance, uniting faces."
    },

    {
        title : "project_management",
        phrase : "Where organization meets efficiency in project management."
    }
];

function Heros() {

    const [currentPhrase, setCurrentPhrase] = useState("where innovation meets collaboration! ");
    const navigate = useNavigate();

    const AnimateWord = (text) => {
        const words = text.split(' ');
        let currentWord = 0;
        let currentLetter = 0;

    
    
        const interval = setInterval(() => {
            setCurrentPhrase(prevPhrase => {
                let animatedText = "";
    
                for (let i = 0; i <= currentWord; i++) {
                    const word = words[i];
                    const displayLetters = (i === currentWord) ? word.slice(0, currentLetter + 1) : word;
                    animatedText += displayLetters + ((i < currentWord) ? ' ' : '');
                }
    
                return animatedText;
            });
    
            currentLetter++;
    
            if (currentLetter === words[currentWord].length) {
                currentLetter = 0;
                currentWord++;
            }
    
            if (currentWord === words.length) {
                clearInterval(interval);
            }
        }, 100); // You can adjust the interval duration (in milliseconds) for the typing speed
    };
    

    useEffect(()=>{
        AnimateWord(currentPhrase)
    },[])

    return (
        <>
            <div style={{
                marginTop: "15vh"
            }}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={6} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div>
                            <Typography variant='h3'>
                                Welcome to <Typography variant='h1'>TeamBlend,</Typography>
                            </Typography>

                            <Typography variant='h6'>
                                {currentPhrase}
                            </Typography>
                            <Button variant='outlined' style={{
                                marginTop : "10px"
                            }} onClick={()=>{
                                navigate('/apps/project-management/my-teams')
                            }}>
                                Get Started
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div >

                            <img
                                src='https://cdn.dribbble.com/users/2590445/screenshots/17165409/media/62628388dd25da17ae27421b75466055.jpg'
                                alt='image'
                                style={{
                                    maxWidth: "90%", // Ensure the image doesn't exceed its natural size
                                    height: "auto",
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Heros