import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../auth/login';
import LogoutButton from '../auth/logout';
import Loading from '../util/Loading';
import { Navigate } from "react-router-dom";
import '../styles/home.css'

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [goToWorkouts, setGoToWorkouts] = useState(false)

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='home'>
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
        { isAuthenticated && <LogoutButton /> }
        { !isAuthenticated && <LoginButton /> }
      </div>

      {user && goToWorkouts && <Navigate to='/user'/>}


      

      {/* { isAuthenticated && user.email } */}
      

    </div>
  )
}

export default Home