import React from 'react'
import NavBar from '../../util/NavBar'
import { Outlet } from 'react-router-dom'

function User() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default User