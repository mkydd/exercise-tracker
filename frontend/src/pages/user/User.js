import React from 'react'
import NavBar from '../../util/NavBar'
import { Outlet } from 'react-router-dom'
import '../../styles/user/user.css'

function User() {
  return (
    <div className="user">
      <div className="user-page-wrapper">
        <Outlet />
      </div>
      <NavBar />
    </div>
  )
}

export default User