import React, { useEffect, useState } from 'react'
import '../../styles/template.css'

function Template( {workout} ) {
  const [exerciseNames, setExerciseNames] = useState([])

  function getExerciseNames() {
    let temp = []
    workout.exercises.forEach(exercise => {
      temp.push(exercise.exerciseName)
    });
    return temp
  } 

  useEffect(() => {
    setExerciseNames(getExerciseNames())
  }, [workout])

  useEffect(() => {
    console.log('exerciseNames =', exerciseNames)
  }, [exerciseNames])
  return (
    <div className="workout-template-wrapper">
      <div className='workout-template'>
        <h4>{workout.name}</h4>
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
    </div>
  )
}

export default Template