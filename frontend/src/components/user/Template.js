import React, { useEffect, useState } from 'react'
import '../../styles/user/template.css'
import ConfirmationPrompt from '../../components/ConfirmationPrompt';

function Template( {workout, deleteWorkout} ) {
  const [exerciseNames, setExerciseNames] = useState([])
  const [promptDisplay, setDisplayPrompt] = useState(false)
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
        <div className="date">
          {workout.date.day}
          &nbsp;
          {workout.date.month}
          &nbsp;
          {workout.date.year}
        </div>
      </div>
      <ConfirmationPrompt 
        display={promptDisplay}
        msg={msg}
        closePrompt={() => setDisplayPrompt(false)}
        onConfirm={deleteWorkout}/>
    </div>
  )
}

export default Template