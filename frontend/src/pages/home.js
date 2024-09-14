import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../auth/login';
import SignUpButton from '../auth/signUp';
import LogoutButton from '../auth/logout';
import Loading from '../util/Loading';
import { Navigate } from "react-router-dom";
import '../styles/home.css'
import Banner from '../util/Banner';

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [goToWorkouts, setGoToWorkouts] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('deletedUser') === 'true') {
      localStorage.removeItem('deletedUser')
      setShowBanner(true)
    }
  }, [])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='home'>
      <Banner 
        status='success'
        msg='Account Successfully Deleted'
        display={showBanner}
        setDisplay={setShowBanner}/>
      <div className="header">
        <div className='exercise'><h1>Exercise</h1></div> 
        &nbsp;
        <div className='tracker'><h1>Tracker</h1></div>
      </div>

      <div className="welcome-message">
        <h2>Welcome</h2>
        <div className='message-btn-wrapper'>
          <div className='message'>Please click button below to access workouts</div>
          <div className='btn-wrapper'><button className='goTo' onClick={() => setGoToWorkouts(true)}>Go to Workouts</button></div>
        </div>
        <div className="login-signup-wrapper">
          { !isAuthenticated && <LoginButton /> }
          { !isAuthenticated && <SignUpButton /> }
        </div>
        { isAuthenticated && <LogoutButton /> }
      </div>

      {user && goToWorkouts && <Navigate to='/user/home'/>}


      

      {/* { isAuthenticated && user.email } */}
      

    </div>
  )
}

export default Home