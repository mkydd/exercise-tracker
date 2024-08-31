import React from 'react'

function EndWorkoutButton({ onFinish }) {

  function endWorkout() {
    onFinish()
  }

  return (
    <div>
      <button 
        className="end-workout-button"
        onClick={() => {
          endWorkout()
          setTimeout(() => {
            window.location.replace('http://localhost:3000/user/home')
          }, 1000);
        }}>
        End Workout
      </button>
    </div>
  )
}

export default EndWorkoutButton