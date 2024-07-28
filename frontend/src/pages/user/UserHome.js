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
    console.log('userData =', userData)
    async function getData() {
      let { workout } = await getWorkoutData('66a5244d870c3d3f05a80621')
      setUserWorkouts(workout.workouts)
    }
    if (userData) {
      getData()
    }
  }, [userData])

  useEffect(() => {
    console.log('userWorkouts =', userWorkouts)
  }, [userWorkouts])



  return (
    <div className='user-home'>
      UserHome
      <button>Start New Workout</button>
      <h1>Previous Workout</h1>
      <div className="template-header">
        <h2>Templates</h2>
        <button>+Template</button>
      </div>
      <div className="templates">
        <Template workout={{name: 'Push', exercises: ['bench press', 'cable fly', 'tricep dip'], date: 'Jul 26 2024'}}/>
        <Template workout={{name: 'Push', exercises: ['bench press', 'cable fly', 'tricep dip'], date: 'Jul 26 2024'}}/>
        <Template workout={{name: 'Push', exercises: ['bench press', 'cable fly', 'tricep dip'], date: 'Jul 26 2024'}}/>
        <Template workout={{name: 'Push', exercises: ['bench press', 'cable fly', 'tricep dip'], date: 'Jul 26 2024'}}/>
        <Template workout={{name: 'Push', exercises: ['bench press', 'cable fly', 'tricep dip'], date: 'Jul 26 2024'}}/>
        <Template workout={{name: 'Push', exercises: ['bench press', 'cable fly', 'tricep dip'], date: 'Jul 26 2024'}}/>
      </div>
      


    </div>
  )
}

export default UserHome;