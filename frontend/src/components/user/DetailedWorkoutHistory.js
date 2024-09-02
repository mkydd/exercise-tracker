import React from 'react'

function DetailedWorkoutHistory({ workout, onClick }) {
  return (
    <div>
      <ul>
        {workout.exercises.map((exercise) => {
          return (
            <li key={`prev-workout ${exercise._id}`}>
              <div className="exercise-name">{exercise.exerciseName}</div>
              <table className='previous-workout-sets-table'>
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Reps</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set) => {
                    return (
                      <tr key={`prev-workout-set ${exercise.exerciseName} ${set._id}`}>
                        <td>{set.setNumber}</td>
                        <td>{set.reps}</td>
                        <td><div className="weight-wrapper">{set.weight}<div className='units'>lbs</div></div></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </li>
          )
        })}
      </ul>
      <div className="show-more-wrapper">
        <button onClick={() => onClick(false)}>Hide Details</button>
      </div>
    </div>
  )
}

export default DetailedWorkoutHistory