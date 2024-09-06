import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import ConfirmationPrompt from '../ConfirmationPrompt'
import months from '../../util/months'
import DetailedWorkoutHistory from './DetailedWorkoutHistory'
import BasicWorkoutHistory from './BasicWorkoutHistory'
import UpdateWorkoutPrompt from '../UpdateWorkoutPrompt'

function PreviousWorkout({ userId, workout, allWorkouts, updateWorkouts, workoutIndex }) {
  const { userData, setUserWorkouts } = useOutletContext()
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [promptDisplay, setDisplayPrompt] = useState(false)
  const msg = 'Are you sre you want to delete this template?'

  // FOR TESTING
  // useEffect(() => {
  //   console.log('workout =', workout)
  // }, [workout])

  async function deleteWorkout(workoutId, userId) {
    console.log('workout =', workout)
    const workoutRes = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/workouts/${workoutId}`, {
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
        { !showUpdatePrompt &&
          <button 
            className='delete-previous-workout-button' 
            onClick={() => setDisplayPrompt(true)}>X</button>}
      </div>
      <div className='date'>
        {workout.date.day}
        &nbsp;
        {months[workout.date.month]}
        &nbsp;
        {workout.date.year}
      </div>
      <div className="exercises">
        { !showMore && !showUpdatePrompt &&
          <BasicWorkoutHistory 
            workout={workout}
            onClick={setShowMore}/> }

        { showMore && !showUpdatePrompt &&
          <DetailedWorkoutHistory 
            workout={workout}
            onClick={setShowMore}/> }
      </div>

      <div className="show-update-prompt-button-wrapper">
        { !showUpdatePrompt && 
          <button 
            className='show-update-prompt-button'
            onClick={() => setShowUpdatePrompt(true)}>Update Workout</button>}
      </div>
      { showUpdatePrompt &&
        <UpdateWorkoutPrompt 
          closePrompt={() => setShowUpdatePrompt(false)}
          setUserWorkouts={setUserWorkouts}
          allWorkouts={allWorkouts}
          workoutIndex={workoutIndex}
          userId={userId}
          />
      }

      <ConfirmationPrompt 
        display={promptDisplay}
        msg={msg}
        closePrompt={() => setDisplayPrompt(false)}
        onConfirm={() => deleteWorkout(workout._id, userData._id)}/>
    </div>
  )
}

export default PreviousWorkout