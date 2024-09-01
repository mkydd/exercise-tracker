import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ConfirmationPrompt from '../ConfirmationPrompt'

function PreviousWorkout({ workout, allWorkouts, updateWorkouts }) {
  const { userData } = useOutletContext()

  const [promptDisplay, setDisplayPrompt] = useState(false)
  const msg = 'Are you sre you want to delete this template?'

  async function deleteWorkout(workoutId, userId) {
    console.log('workout =', workout)
    const workoutRes = await fetch(`/api/v1/users/workouts/${workoutId}`, {
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

    const newWorkouts = allWorkouts.filter(workout => workout._id !== workoutId)
    updateWorkouts(newWorkouts)
    
    console.log(workoutRes) 
  }
  
  return (
    <div className='previous-workout'>
      <div className="previous-workout-header">
        <div className='name'>{workout.name}</div>
        <button 
          className='delete-previous-workout-button' 
          onClick={() => setDisplayPrompt(true)}>X</button>
      </div>
      <div className='date'>
        {workout.day}
        &nbsp;
        {workout.month}
        &nbsp;
        {workout.year}
      </div>
      <div className="exercises">
        <ul>
          {workout.exercises.map((exercise) => {
            return (
              <li key={`prev-workout ${exercise._id}`}>
                {exercise.sets.length} &nbsp; x &nbsp; {exercise.exerciseName}
              </li>
            )
          })}
        </ul>
      </div>
      <ConfirmationPrompt 
        display={promptDisplay}
        msg={msg}
        closePrompt={() => setDisplayPrompt(false)}
        onConfirm={() => deleteWorkout(workout._id, userData._id)}/>
    </div>
  )
}

export default PreviousWorkout