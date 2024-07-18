import React from 'react'
import LoginButton from "./Auth/Login";
import LogoutButton from "./Auth/Logout";

function Home() {
  return (
    <div>
      Home
      <LoginButton />
      <LogoutButton />
    </div>
  )
}

export default Home