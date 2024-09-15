import React from 'react'

function WorkoutHeader({ workoutName, setWorkoutName }) {
  return (
    <div className='workout-header'>
      <input 
        type="text" 
        maxLength="50"
        value={workoutName} 
        className='workout-header-input'
        onChange={(e) => setWorkoutName(e.target.value)}
      />
    </div>
  )
}

export default WorkoutHeader