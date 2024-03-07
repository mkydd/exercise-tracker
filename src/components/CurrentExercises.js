import React from 'react'

function CurrentExercises({ exercises }) {
  return (
    <div>
      <ul>
        {exercises.map((exercise) => {
          return <li key={exercise.id}>{exercise.name}</li>
        })}
      </ul>
    </div>
  )
}

export default CurrentExercises