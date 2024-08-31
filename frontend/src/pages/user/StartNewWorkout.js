import React, { useEffect, useState } from 'react'
import { useOutletContext, Navigate } from 'react-router-dom'
import '../../styles/user/startNewWorkout.css'
import Template from '../../components/user/Template';

function StartNewWorkout() {
  const { userWorkouts, userData } = useOutletContext()
  const [templates, setTemplates] = useState([])
  const [startWorkout, setStartWorkout] = useState(false)

  useEffect(() => {
    if (userWorkouts) {
      setTemplates(userWorkouts)
    }
  }, [userWorkouts])

  async function deleteWorkout(workoutId, userId) {
    const workout = await fetch(`/api/v1/users/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId
      })
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
    
    console.log(workout) 
  }
  
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
          {templates.map((workout) => {
            return (
              <li key={workout._id}>
                <Template 
                  workout={workout} 
                  deleteWorkout={() => deleteWorkout(workout._id, userData._id)}/>
              </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default StartNewWorkout;