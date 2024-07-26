import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'


function NavBar() {
  return (
    <div className='nav-bar'>
      <NavLink to='./profile'>Profile</NavLink>
      <NavLink to='./history'>History</NavLink>
      <NavLink to='./exercises'>Exercises</NavLink>
      <NavLink to='./'>NewWorkout</NavLink>
    </div>
  )
}

export default NavBar