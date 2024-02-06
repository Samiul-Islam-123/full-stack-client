import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from '../Pages/Public/LandingPage/LandingPage';
import AppController from '../Pages/Private/Apps/AppController';
import Cookies from 'js-cookie';
import SignUp from '../Pages/Public/Auth/SignupPage/Signup';
import { Typography } from '@mui/material';
import Login from '../Pages/Public/Auth/LoginPage/Login';
import PasswordReset from '../Pages/Public/Auth/PasswordResetPage/PasswordReset';
import PasswordResetVerification from '../Pages/Public/Auth/PasswordResetPage/PasswordResetVerification';
import OTPVerification from '../Pages/Public/Auth/OTP/OTPVerification';
import FreelanceMarketPlace from '../Pages/Private/Apps/FreelanceMarketPlace/FreelanceMarketPlace';
import VideoCalling from '../Pages/Private/Apps/VideoCalling/VideoCalling';
import VideoStreaming from '../Pages/Private/Apps/VideoStreaming/VideoStreaming';
import ProjectManagement from '../Pages/Private/Apps/ProjectManagement/ProjectManagement';
import Dashboard from '../Pages/Private/Apps/Dashboard/Dashboard';

function RouteController() {

    return (
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />

                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/password-reset" element={<PasswordReset />} />
                <Route exact path="/otp-verification/:email" element={<OTPVerification />} />
                <Route exact path="/password-reset/verification" element={<PasswordResetVerification />} />
                <Route exact path="/apps/*" element={<AppController />} />
                
            </Routes>
        </>
    );
}

export default RouteController;
