import React, { useEffect, useState } from 'react'
import '../../styles/user/template.css'
import ConfirmationPrompt from '../../components/ConfirmationPrompt';
import { Navigate } from 'react-router-dom';

function Template( {workout, deleteWorkout} ) {
  const [exerciseNames, setExerciseNames] = useState([])
  const [promptDisplay, setDisplayPrompt] = useState(false)
  const [displayTemplateWorkout, setDisplayTemplateWorkout] = useState(false)
  const msg = 'Are you sre you want to delete this template?'

  useEffect(() => {
    let temp = []
    workout.exercises.forEach(exercise => {
      temp.push(exercise.exerciseName)
    })

    setExerciseNames(temp)
  }, [workout])

  // USED FOR TESTING
  // useEffect(() => {
  //   console.log('exerciseNames =', exerciseNames)
  // }, [exerciseNames])

  return (
    <div className="workout-template-wrapper">
      <div className='workout-template'>
        <div className="template-header">
          <h4>{workout.name}</h4>
          <button className='remove-template-button' onClick={() => setDisplayPrompt(true)}>X</button>
        </div>
        <div className="exercises">
          {exerciseNames.join(", ")}
        </div>
        <div>
          <div className="date">
            {workout.date.day}
            &nbsp;
            {workout.date.month}
            &nbsp;
            {workout.date.year}
          </div>
          <div className="start">
            <button onClick={() => setDisplayTemplateWorkout(true)}>start</button>
        </div>
        </div>
      </div>
      <ConfirmationPrompt 
        display={promptDisplay}
        msg={msg}
        closePrompt={() => setDisplayPrompt(false)}
        onConfirm={deleteWorkout}/>

      { displayTemplateWorkout && 
        <Navigate to='/user/workout' state={{ workout }} /> }

    </div>
  )
}

export default Template