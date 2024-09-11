import React, { useState } from 'react'
import Exercises from './Exercises'

function AddExerciseButton({ onClickFunction }) {
  const [clicked, setClicked] = useState(false)
  
  return (
    <div>
      <button 
        className='add-exercise-button' 
        onClick={() => setClicked(!clicked)}>
          Add Exercise
      </button>
      { clicked ? 
        <Exercises 
          handleClick={(exercise) => {
            onClickFunction(exercise)
            window.scrollTo({ top: 0, 'behavior':'smooth' })
          }}/> : null}
    </div>
  )
}

export default AddExerciseButton