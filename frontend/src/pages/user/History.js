import React from 'react'
import { useOutletContext } from 'react-router-dom'
import PreviousWorkout from '../../components/user/PreviousWorkout'
import '../../styles/user/history.css'

function History() {
  const { userWorkouts, setUserWorkouts } = useOutletContext()

  return (
    <div className='history'>
      <h1>History</h1> 
      <ul className='workouts'>
        {userWorkouts.map((workout) => {
          return (
            <li key={`history ${workout._id}`}>
              <PreviousWorkout
               workout={workout}
               allWorkouts={userWorkouts}
               updateWorkouts={setUserWorkouts}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default History