import React, { useEffect, useState } from 'react'
import '../../styles/user/template.css'
import { Navigate } from 'react-router-dom';

function Template( {workout} ) {
  const [exerciseNames, setExerciseNames] = useState([])
  const [displayTemplateWorkout, setDisplayTemplateWorkout] = useState(false)

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
        </div>
        <div className="exercises">
          {exerciseNames.join(", ")}
        </div>
        <div className='template-date-start-wrapper'>
          <div className="date">
            {workout.date.day}
            &nbsp;
            {workout.date.month}
            &nbsp;
            {workout.date.year}
          </div>
          <div className="start-template-button-wrapper">
            <button 
              className="start-template-button"
              onClick={() => setDisplayTemplateWorkout(true)}>start</button>
          </div>
        </div>
      </div>

      { displayTemplateWorkout && 
        <Navigate to='/user/workout' state={{ workout }} /> }

    </div>
  )
}

export default Template