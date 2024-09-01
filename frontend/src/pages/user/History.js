import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import PreviousWorkout from '../../components/user/PreviousWorkout'
import '../../styles/user/history.css'

function History() {
  const { userWorkouts } = useOutletContext()
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    // console.log('userWorkouts =', userWorkouts)
    if (userWorkouts) {
      setWorkouts(userWorkouts)
    }
  }, [userWorkouts])

  return (
    <div className='history'>
      <h1>History</h1> 
      <ul className='workouts'>
        {workouts.map((workout) => {
          return (
            <li key={`history ${workout._id}`}>
              <PreviousWorkout
               workout={workout}
               allWorkouts={workouts}
               updateWorkouts={setWorkouts}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default History