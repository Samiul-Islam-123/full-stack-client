import { Card, Grid, Typography } from '@mui/material'
import React from 'react'
import MemberCard from './MemberCard'

function TeamMembers(props) {
    const {Members} = props;
  return (
    <>

        {
            Members ? (<>
            <Typography variant='h4' style={{
            marginTop : "10px"
        }}>
            Team members ({Members.length})
        </Typography>
        
            <Grid container spacing={1} marginTop={1}>
                {Members.map(item=>{
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