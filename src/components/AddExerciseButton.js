import React, { useState } from 'react'
import Exercises from './Exercises'

function AddExerciseButton({ onClickFunction }) {
  const [clicked, setClicked] = useState(false)
  
  return (
    <div>
      <button onClick={() => setClicked(!clicked)}>Add Exercise</button>
      {clicked ? <Exercises onClickFunction={onClickFunction}/> : null}
    </div>
  )
}

export default AddExerciseButton