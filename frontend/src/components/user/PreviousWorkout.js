import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ConfirmationPrompt from '../ConfirmationPrompt'
import months from '../../util/months'

function PreviousWorkout({ workout, allWorkouts, updateWorkouts }) {
  const { userData } = useOutletContext()

  const [promptDisplay, setDisplayPrompt] = useState(false)
  const msg = 'Are you sre you want to delete this template?'

  // FOR TESTING
  useEffect(() => {
    console.log('workout =', workout)
  }, [workout])

  async function deleteWorkout(workoutId, userId) {
    console.log('workout =', workout)
    const workoutRes = await fetch(`/api/v1/users/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId
      })
    })
      .then(res => res.json())
      .then(data => {
        return data
      })

    const newWorkouts = allWorkouts.filter(workout => workout._id !== workoutId)
    updateWorkouts(newWorkouts)
    
    console.log(workoutRes) 
  }
  
  return (
    <div className='previous-workout'>
      <div className="previous-workout-header">
        <div className='name'>
          <h3>{workout.name}</h3>
        </div>
        <button 
          className='delete-previous-workout-button' 
          onClick={() => setDisplayPrompt(true)}>X</button>
      </div>
      <div className='date'>
        {workout.date.day}
        &nbsp;
        {months[workout.date.month]}
        &nbsp;
        {workout.date.year}
      </div>
      <div className="exercises">
        Exercises
        <ul>
          {workout.exercises.map((exercise) => {
            return (
              <li key={`prev-workout ${exercise._id}`}>
                <div className="exercise-name">{exercise.exerciseName}</div>
                <table>
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
                          <td>{set.weight}</td>
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
      <ConfirmationPrompt 
        display={promptDisplay}
        msg={msg}
        closePrompt={() => setDisplayPrompt(false)}
        onConfirm={() => deleteWorkout(workout._id, userData._id)}/>
    </div>
  )
}

export default PreviousWorkout