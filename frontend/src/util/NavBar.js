import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'


function NavBar() {
  function styleActiveLink(isActive) {
    if (isActive) {
      return {
        color: 'white'
      }
    }

    return {}
  }
  return (
    <div className='nav-bar'>
      <NavLink 
        style={({ isActive }) => styleActiveLink(isActive)} 
        to='./profile' 
        className='nav-link'>Profile</NavLink>

      <NavLink 
        style={({ isActive }) => styleActiveLink(isActive)} 
        to='./history' 
        className='nav-link'>History</NavLink>

      <NavLink 
        style={({ isActive }) => styleActiveLink(isActive)} 
        to='./exercises' 
        className='nav-link'>Exercises</NavLink>

      <NavLink 
        style={({ isActive }) => styleActiveLink(isActive)} 
        to='./home' 
        className='nav-link'>NewWorkout</NavLink>
    </div>
  )
}

export default NavBar