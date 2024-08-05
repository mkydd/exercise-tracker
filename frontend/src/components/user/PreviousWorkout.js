import React from 'react'

function PreviousWorkout({ workout }) {
  return (
    <div className='previous-workout'>
      <div className='name'>{workout.name}</div>
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
    </div>
  )
}

export default PreviousWorkout