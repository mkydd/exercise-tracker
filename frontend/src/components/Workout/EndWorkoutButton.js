import React, { useState } from 'react'
import Loading from '../../util/Loading';
import { Navigate } from 'react-router-dom';
import ConfirmationPrompt from '../ConfirmationPrompt';

function EndWorkoutButton({ onFinish }) {
  const [loading, setLoading] = useState(false)
  const [goHome, setGoHome] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  function onEndWorkout() {
    setLoading(true)
    onFinish()
    setTimeout(() => {
      setGoHome(true)
    }, 500);
  }

  return (
    <div>
      <button 
        className="end-workout-button"
        onClick={() => setShowPrompt(true)}
        >
        End Workout
      </button>
      
      <ConfirmationPrompt 
        msg='Are you sure you want to end your workout?'
        onConfirm={onEndWorkout}
        closePrompt={setShowPrompt}
        display={showPrompt}
        buttonColor='rgb(36, 148, 36)'/> 
      { loading && <Loading /> }
      { goHome && <Navigate to='/user/home'/>}

    </div>
  )
}

export default EndWorkoutButton