import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../auth/login';
import LogoutButton from '../auth/logout';
import '../styles/home.css'

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className='home'>
      <h1>
        <div className="header">
          <div className='exercise'>Exercise</div> &nbsp; <div className='tracker'>Tracker</div>
        </div>
      </h1>

      { !isAuthenticated && <LoginButton /> }
      { isAuthenticated && <LogoutButton /> }

      { isAuthenticated && user.email }
      

    </div>
  )
}

export default Home