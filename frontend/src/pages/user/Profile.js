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
    </div>
  )
}

export default Profile