import React, { useEffect, useState } from 'react'
import '../../styles/user/profile.css'
import { useOutletContext } from 'react-router-dom'

function Profile() {
  const { userWorkouts, userData } = useOutletContext()
  const [workouts, setWorkouts] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    if (userWorkouts) {
      setWorkouts(userWorkouts)
    }
  }, [userWorkouts])

  useEffect(() => {
    if (userData) {
      setUser(userData)
    }
  }, [userData])

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <div className="profile-header">
        <div className="initials">
          {user && user.name.firstName.charAt(0)}
          {user && user.name.lastName.charAt(0)}
        </div>
        <div className="email">
          {user && user.email}
        </div>
      </div>
    </div>
  )
}

export default Profile