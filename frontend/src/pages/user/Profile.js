import React, { useEffect, useState } from 'react'
import '../../styles/user/profile.css'
import { useOutletContext } from 'react-router-dom'
import DeleteUserAccount from '../../components/user/DeleteUserButton'

function Profile() {
  const { userWorkouts, userData } = useOutletContext()
  const [workouts, setWorkouts] = useState([])
  const [user, setUser] = useState()

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
      <div className="stats">
      <h2>Stats</h2>
        <div className="stat total-workouts">
          Total Workouts: <div>{workouts.length}</div>
        </div>
        <div className="stat age">
          Age:&nbsp;<div>{user && user.stats.age}</div>
        </div>
        <div className="stat weight">
          Weight:&nbsp;<div>{user && user.stats.weight}</div><div className='unit'>kg</div>
        </div>
        <div className="stat height">
          Height:&nbsp;<div>{user && user.stats.height}</div><div className='unit'>cm</div>
        </div>
      </div>
      <div>
        <DeleteUserAccount />
      </div>
    </div>
  )
}

export default Profile