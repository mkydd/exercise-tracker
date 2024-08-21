import React, { useEffect, useState } from 'react'

function WorkoutHeader() {
  const [workoutName, setWorkoutName] = useState('Workout')
  useEffect(() => {
    console.log('workout name =', workoutName)
  }, [workoutName])
  return (
    <div className='workout-header'>
      <input 
        type="text" 
        value={workoutName} 
        className='workout-header-input'
        onChange={(e) => setWorkoutName(e.target.value)}
      />
    </div>
  )
}

export default WorkoutHeader