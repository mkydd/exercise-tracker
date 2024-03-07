import React from 'react'

function CurrentExercises({ exercises, removeExercise }) {
  return (
    <div>
      <ul>
        {exercises.map((exercise) => {
          return <li key={exercise.id} onClick={() => removeExercise(exercise)}>{exercise.name}</li>
        })}
      </ul>
    </div>
  )
}

export default CurrentExercises