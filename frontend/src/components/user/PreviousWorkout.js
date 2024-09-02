import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ConfirmationPrompt from '../ConfirmationPrompt'
import months from '../../util/months'
import DetailedWorkoutHistory from './DetailedWorkoutHistory'
import BasicWorkoutHistory from './BasicWorkoutHistory'

function PreviousWorkout({ workout, allWorkouts, updateWorkouts }) {
  const { userData } = useOutletContext()
  const [showMore, setShowMore] = useState(false)
  const [promptDisplay, setDisplayPrompt] = useState(false)
  const msg = 'Are you sre you want to delete this template?'

  // FOR TESTING
  useEffect(() => {
    console.log('workout =', workout)
  }, [workout])

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
        <div className='name'>
          <h3>{workout.name}</h3>
        </div>
        <button 
          className='delete-previous-workout-button' 
          onClick={() => setDisplayPrompt(true)}>X</button>
      </div>
      <div className='date'>
        {workout.date.day}
        &nbsp;
        {months[workout.date.month]}
        &nbsp;
        {workout.date.year}
      </div>
      <div className="exercises">
        { !showMore && 
          <BasicWorkoutHistory 
            workout={workout}
            onClick={setShowMore}/> }

        { showMore &&
          <DetailedWorkoutHistory 
            workout={workout}
            onClick={setShowMore}/> }
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