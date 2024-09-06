import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import PreviousWorkout from '../../components/user/PreviousWorkout'
import '../../styles/user/history.css'

function History() {
  const { userData, userWorkouts, setUserWorkouts } = useOutletContext()

  useEffect(() => {
    console.log('this is userWorkout = ', userWorkouts)
  }, [userWorkouts])

  return (
    <div className='history'>
      <h1>History</h1> 
      <ul className='workouts'>
        {userWorkouts && userWorkouts.map((workout, index) => {
          return (
            <li key={`history ${workout._id}`}>
              <PreviousWorkout
               workout={workout}
               allWorkouts={userWorkouts}
               updateWorkouts={setUserWorkouts}
               workoutIndex={index}
               userId={userData._id}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default History