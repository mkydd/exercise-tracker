import React from 'react'

function BasicWorkoutHistory({ workout, onClick }) {
  return (
    <div>
      <ul>
        { workout.exercises.map((exercise) => {
          return (
            <li key={`prev-workout ${exercise._id} basic`}>
              <div className="exercise-set-text">
                {exercise.sets.length} <div className="sets-of">&nbsp;x&nbsp;</div> {exercise.exerciseName}
              </div>
            </li>
          )
        })}
      </ul> 
      <div className="show-more-wrapper">
        <button onClick={() => onClick(true)}>Show More</button>
      </div>
    </div>
  )
}

export default BasicWorkoutHistory