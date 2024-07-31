import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import getUserData from '../../util/fetchUserData';
import getWorkoutData from '../../util/fetchUserWorkouts';
import '../../styles/userHome.css'
import Template from '../../components/user/Template';

function UserHome() {
  const { user } = useAuth0();
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
      let { workout } = await getWorkoutData('66a9001db450b4d2f58b8a16')
      setUserWorkouts(workout.workouts)
    }
    if (userData) {
      getData()
    }
  }, [userData])


  return (
    <div className='user-home'>
      UserHome
      <button>Start New Workout</button>
      <h1>Previous Workout</h1>
      <div className="template-header">
        <h2>Templates</h2>
        <button>+Template</button>
      </div>
      <div>
        <ul className="templates">
          {userWorkouts.map((workout) => {
            return (
              <li key={workout._id}>
                <Template workout={workout} />
              </li>)
          })}
        </ul>
      </div>
      


    </div>
  )
}

export default UserHome;