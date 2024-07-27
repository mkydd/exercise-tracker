import React from 'react'
import '../../styles/template.css'

function Template( {workout} ) {
  return (
    <div className="workout-template-wrapper">
      <div className='workout-template'>
        <h4>{workout.name}</h4>
        <div className="exercises">
          {workout.exercises.join(", ")}
        </div>
        <div className="date">
          {workout.date}
        </div>
      </div>
    </div>
  )
}

export default Template