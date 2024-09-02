import React, { useState } from 'react'
import { useOutletContext, Navigate } from 'react-router-dom'
import '../../styles/user/startNewWorkout.css'
import Template from '../../components/user/Template';

function StartNewWorkout() {
  const { userWorkouts } = useOutletContext()
  const [startWorkout, setStartWorkout] = useState(false)
  
  return (
    <div className='user-home'>
      <h1>Start Workout</h1>
      {startWorkout && <Navigate to='/user/workout'/>}
      <button className='start-workout' onClick={() => setStartWorkout(true)}>Start an Empty Workout</button>
      <div className="template-header">
        <h2>Templates</h2>
        <button className='new-template'>+Template</button>
      </div>
      <div>
        <ul className="templates">
          {userWorkouts.map((workout) => {
            return (
              <li key={workout._id}>
                <Template 
                  workout={workout} />
              </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default StartNewWorkout;