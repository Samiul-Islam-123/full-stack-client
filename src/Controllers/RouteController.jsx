import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Pages/Public/LandingPage/LandingPage'
import Services from '../Pages/Private/Services/Services'
import AppController from '../Pages/Private/Apps/AppController'
import Cookies from "js-cookie"
import SignUp from '../Pages/Public/Auth/SignupPage/Signup'
import { Typography } from '@mui/material'
import Login from '../Pages/Public/Auth/LoginPage/Login'
import PasswordReset from '../Pages/Public/Auth/PasswordResetPage/PasswordReset'
import PasswordResetVerification from '../Pages/Public/Auth/PasswordResetPage/PasswordResetVerification'

function RouteController() {

    
    const [allowed, setAllowed] = useState(false);

    const CheckAuth = () => {
        //this function will check authentication
        const token = Cookies.get('access_token');
        if (!token)
            setAllowed(false);

        else
            setAllowed(true)
    }

    useEffect(() => {
        CheckAuth()
    }, [])

    return (
        <>

            <Routes>
                <Route exact path='/' element={<LandingPage />} />
                <Route exact path='/services' element={<Services />} />
                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/password-reset' element={<PasswordReset />} />
                <Route exact path='/password-reset/verification' element={<PasswordResetVerification />} />




                <Route exact path='/apps' element={
                    allowed ? (<AppController />) : (<><Typography variant='h1'>
                            Sorry , you are not allowed :(
                        </Typography></>)
                } />

                   
                
            </Routes>

        </>
    )
}

export default RouteController