import { Typography } from '@mui/material'
import React from 'react';
import Calendar, { Calander } from './Calander';
import TodoList from './TodoList/TodoList';

function Productivity() {
  return (
    <>
        <Typography variant='h4'style={{
            marginTop : "10px",
            marginBottom : "10px"
        }}>
            Productivity
        </Typography>

        <TodoList />
        <Calander />

    </>
  )
}

export default Productivity