import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import '../styles/navbar.css'


function NavBar() {
  const { pathname } = useLocation();
  const [displayNavBar, setDisplayNavBar] = useState(true)

  useEffect(() => {
    if (pathname === '/user/workout') {
      setDisplayNavBar(false)
    } else {
      setDisplayNavBar(true)
    }
  }, [pathname])

  function styleActiveLink(isActive) {
    if (isActive) {
      return {
        color: 'white'
      }
    }

    return {}
  }
  return (
    <div className='nav-bar-wrpper'>
      { displayNavBar &&
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
        </div> }
    </div>
  )
}

export default NavBar