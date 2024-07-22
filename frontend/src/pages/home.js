import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../auth/login';
import LogoutButton from '../auth/logout';

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>Exercise Tracker</h1>

      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}

      {isAuthenticated && user.email}
      

    </div>
  )
}

export default Home