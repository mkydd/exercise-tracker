import React, { useState } from 'react'

function UpdateWorkoutPrompt({ displayUpdate, closePrompt, workout, setUserWorkouts, allWorkouts, workoutIndex }) {
  const [newWorkouts, setNewWorkouts] = useState(allWorkouts)

  return (
    <div>
      { displayUpdate && 
        <div>
          UpdateWorkoutPrompt
          <button onClick={closePrompt}>Cancel</button>
          <ul>
            {workout.exercises.map((exercise, exerciseIndex) => {
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
                      {exercise.sets.map((set, setIndex) => {
                        return (
                          <tr key={`prev-workout-set ${exercise.exerciseName} ${set._id}`}>
                            <td>
                              <div>{set.setNumber}</div>
                            </td>
                            <td>
                              <div>
                                <input 
                                  type="number" 
                                  value={newWorkouts[workoutIndex].exercises[exerciseIndex].sets[setIndex].reps}
                                  onChange={(e) => {
                                    let tempWorkouts = [...newWorkouts]
                                    tempWorkouts[workoutIndex].exercises[exerciseIndex].sets[setIndex].reps = e.target.value
                                    setNewWorkouts(tempWorkouts)
                                    setUserWorkouts(tempWorkouts)
                                  }}
                                  required/>
                              </div>
                              
                            </td>
                            <td>
                              <div>
                                <input 
                                  type="number" 
                                  value={exercise.sets[setIndex].weight}
                                  onChange={(e) => {
                                    let tempWorkouts = [...newWorkouts]
                                    tempWorkouts[workoutIndex].exercises[exerciseIndex].sets[setIndex].weight = e.target.value
                                    setNewWorkouts(tempWorkouts)
                                    setUserWorkouts(tempWorkouts)
                                  }}
                                  required/>
                              </div>
                              
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </li>
              )
            })}
          </ul>  
        </div>
      }
    </div>
  )
}

export default UpdateWorkoutPrompt