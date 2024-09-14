import React, { useState } from 'react'
import Loading from '../../util/Loading';
import { Navigate } from 'react-router-dom';

function EndWorkoutButton({ onFinish }) {
  const [loading, setLoading] = useState(false)
  const [goHome, setGoHome] = useState(false)

  return (
    <div>
      <button 
        className="end-workout-button"
        onClick={() => {
          setLoading(true)
          onFinish()
          setTimeout(() => {
            setGoHome(true)
          }, 500);
        }}>
        End Workout
      </button>

      { loading && <Loading /> }
      { goHome && <Navigate to='/user/home'/>}

    </div>
  )
}

export default EndWorkoutButton