import React, { useState } from 'react'
import '../styles/updateWorkoutPrompt.css'

function UpdateWorkoutPrompt({ displayUpdate, closePrompt, userId, setUserWorkouts, allWorkouts, workoutIndex }) {
  const [newWorkouts, setNewWorkouts] = useState(allWorkouts)

  function deleteSet(exerciseIndex, setIndex) {
    let tempWorkout = [...newWorkouts] // create copy of newWorkouts
    
    // filter set out set
    let newSets = tempWorkout[workoutIndex]
      .exercises[exerciseIndex]
      .sets.filter((_, currIndex) => {
        return currIndex !== setIndex
      })

    // update setNumber values
    newSets.forEach((currSet, currIndex) => {
      currSet.setNumber = currIndex + 1
    });

    // update tempWorkout with newSets
    tempWorkout[workoutIndex]
      .exercises[exerciseIndex]
      .sets = newSets
    
    setNewWorkouts(tempWorkout)
  }

  function deleteExercise(exerciseIndex) {
    let tempWorkouts = [...newWorkouts]

    let newExercises = tempWorkouts[workoutIndex].exercises.filter((_, currIndex) => currIndex !== exerciseIndex)
    console.log('newExercises =', newExercises)

    tempWorkouts[workoutIndex]
      .exercises = newExercises

    setNewWorkouts(tempWorkouts)
  }

  async function updateWorkout() {
    const updatedWorkout = newWorkouts[workoutIndex]

    await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/workouts/${userId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        workoutIndex,
        workout: updatedWorkout
      })
    }) 
      .then(res => res.status)
      .then(status => {
        console.log(`workout updated (${status})`)
      })
  }

  return (
    <div>
      { displayUpdate && 
        <div className='update-workout-prompt'>
          <ul>
            {newWorkouts[workoutIndex].exercises.map((exercise, exerciseIndex) => {
              return (
                <li key={`prev-workout ${exercise._id}`}>
                  <div className='exercise-header'>
                    <div className="exercise-name">{exercise.exerciseName}</div>
                    <button
                      className='delete-button'
                      onClick={() => deleteExercise(exerciseIndex)}>X</button>
                  </div>
                  <table className='previous-workout-sets-table'>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Set</th>
                        <th>Reps</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercise.sets.map((set, setIndex) => {
                        return (
                          <tr key={`prev-workout-set ${exercise.exerciseName} ${set._id}`}>
                            <td className='delete-set-button-wrapper'>
                              <button 
                                className='delete-button'
                                onClick={() => deleteSet(exerciseIndex, setIndex)}>X</button>
                            </td>
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
          <div className="button-wrapper">
            <button 
              className='update-button'
              onClick={() => {
                updateWorkout()
                setUserWorkouts(newWorkouts)
                closePrompt()
              }}
            >Update</button>
            <button 
              className='cancel-button'
              onClick={closePrompt}>Cancel</button>
          </div>
        </div>
      }
    </div>
  )
}

export default UpdateWorkoutPrompt