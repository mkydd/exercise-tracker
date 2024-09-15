import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import getUserData from '../../util/fetchUserData';
import getWorkoutData from '../../util/fetchUserWorkouts';
import updateIsVerified from '../../util/updateIsVerified';
import NavBar from '../../util/NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import '../../styles/user/user.css'

function User() {
  const { user, getAccessTokenSilently } = useAuth0()

  const { pathname } = useLocation();

  const [auth0UserId, setAuth0UserId] = useState('')
  const [userData, setUserData] = useState()
  const [userWorkouts, setUserWorkouts] = useState([])

  useEffect(() => {
    async function getData() {
      const token = await getAccessTokenSilently() // checks cache first before requesting new token
      let data = await getUserData(user.email, token)
      setUserData(data.user)
    }
    getData()
  }, [user, getAccessTokenSilently])

  useEffect(() => {
    async function getData() {
      const token = await getAccessTokenSilently()
      let { workout } = await getWorkoutData(userData._id, token)
      setUserWorkouts(workout.workouts)
    }
    if (userData) {
      getData()
    }
  }, [userData, getAccessTokenSilently])

  useEffect(() => {
    async function updateEmail() {
      const token = await getAccessTokenSilently()
      let { user } = await updateIsVerified(userData._id, token)
      setUserData(user)
    }

    if (userData && userData.isVerified !== user.email_verified) {
      updateEmail()
    }
  }, [user, userData, getAccessTokenSilently])

  useEffect(() => {
    if (user) {
      setAuth0UserId(user.sub)
    }
  }, [user])

  return (
    <div className="user">
      <div className="user-page-wrapper" style={pathname === '/user/workout' ? {overflowY: 'visible'} : {}}>
        {user && userData && userWorkouts && <Outlet context={{ setUserData, user, userData, userWorkouts, setUserWorkouts, auth0UserId }}/>}
      </div>
      <NavBar />
    </div>
  )
}

export default User