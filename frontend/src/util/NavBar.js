import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


function NavBar() {
  return (
    <div className='nav-bar'>
      <NavLink to='./profile'>Profile</NavLink>
      <br />
      <NavLink to='./history'>History</NavLink>
      <br />
      <NavLink to='./exercises'>Exercises</NavLink>
      <br />
      <NavLink to='./'>NewWorkout</NavLink>
      <Outlet />
    </div>
  )
}

export default NavBar