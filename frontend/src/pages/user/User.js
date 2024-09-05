import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import getUserData from '../../util/fetchUserData';
import getWorkoutData from '../../util/fetchUserWorkouts';
import NavBar from '../../util/NavBar'
import { Outlet } from 'react-router-dom'
import '../../styles/user/user.css'

function User() {
  const { user } = useAuth0();
  const [auth0UserId, setAuth0UserId] = useState('')
  const [userData, setUserData] = useState()
  const [userWorkouts, setUserWorkouts] = useState([])

  useEffect(() => {
    async function getData() {
      let data = await getUserData(user.email)
      setUserData(data.user)
    }
    getData()
  }, [user])

  useEffect(() => {
    async function getData() {
      let { workout } = await getWorkoutData(userData._id)
      setUserWorkouts(workout.workouts)
    }
    if (userData) {
      getData()
    }
  }, [userData])

  useEffect(() => {
    if (user) {
      setAuth0UserId(user.sub)
    }
  }, [user])

  useEffect(() => {
    console.log('updated workout =', userWorkouts)
  }, [userWorkouts])


  return (
    <div className="user">
      <div className="user-page-wrapper">
        {user && userData && userWorkouts && <Outlet context={{ user, userData, userWorkouts, setUserWorkouts, auth0UserId }}/>}
      </div>
      <NavBar />
    </div>
  )
}

export default User