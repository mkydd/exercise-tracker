import React, { useState } from 'react'
import Loading from '../../util/Loading';

function EndWorkoutButton({ onFinish }) {
  const [loading, setLoading] = useState(false)

  function endWorkout() {
    onFinish()
  }

  return (
    <div>
      <button 
        className="end-workout-button"
        onClick={() => {
          endWorkout()
          setLoading(true)
          window.location.replace('https://mk-exercise-tracker.netlify.app/user/home')
        }}>
        End Workout
      </button>

      { loading && <Loading /> }

    </div>
  )
}

export default EndWorkoutButton