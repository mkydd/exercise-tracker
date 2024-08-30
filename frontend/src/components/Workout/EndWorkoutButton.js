import React from 'react'

function EndWorkoutButton({ time, onFinish }) {

  function endWorkout() {
    onFinish()
  }

  return (
    <div>
      <button 
        className="end-workout-button"
        onClick={() => endWorkout()}>
        End Workout
      </button>
    </div>
  )
}

export default EndWorkoutButton