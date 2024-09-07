import React, { useState } from 'react'
import Loading from '../../util/Loading';

function EndWorkoutButton({ onFinish }) {
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <button 
        className="end-workout-button"
        onClick={() => {
          onFinish()
          setLoading(true)
          setTimeout(() => {
            window.location.replace(process.env.REACT_APP_HOME_URL)
          }, 500);
        }}>
        End Workout
      </button>

      { loading && <Loading /> }

    </div>
  )
}

export default EndWorkoutButton