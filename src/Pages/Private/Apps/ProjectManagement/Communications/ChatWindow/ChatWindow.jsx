import React from 'react'
import { useParams } from 'react-router-dom'
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useTeamDataContext } from '../../../../../../Context/TeamDataProvider';
import Cookies from 'js-cookie';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../../Context/SocketProvider';

function ChatWindow() {

    const { teamID } = useParams();
    const socket = useSocket();


    //console.log(team)
    const [TeamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate();

    const fetchTeamData = async () => {
        setLoading(true)
        try {
            const token = Cookies.get('access_token');
            const headers = { Authorization: token };
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/get-teams-id/${teamID}`);
            console.log(res)
            if (res.data.success === true) {
               // team.updateTeamData(res.data.MyTeams)
                setTeamData(res.data.MyTeams);
                //console.log(res.data.MyTeams)

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
        
            fetchTeamData();
            const token = Cookies.get('access_token');
            socket.emit('join-chat-room', {
                token : token,
                roomID : teamID
            })
        
    }, [])



    useEffect(() => {
        socket.on('user-joined', data=>{
            console.log(data);
            
        })

        socket.on('userData', data=>{
            setUserData(data);
        })
    }, [socket])

    return (
        <>
            {
                (TeamData && userData) && (<>
                    <ChatHeader
                        TeamName={TeamData[0].TeamName}
                        imageURL={TeamData[0].TeamBannerURL}
                        members={TeamData[0].Members.length}
                    />
                    <ChatBody myID={userData.user_id} teamID = {teamID}/>
                    <ChatFooter user_id = {userData.user_id} teamID = {teamID}/>
                </>) 
            }
        </>
    )
}

export default ChatWindow