import React, { useEffect, useState } from 'react'
import Exercises from './Exercises'

function AddExerciseButton() {
  const [clicked, setClicked] = useState(false)
  
  return (
    <div>
      <button onClick={() => setClicked(true)}>Add Exercise</button>
      {clicked ? <Exercises /> : null}
    </div>
  )
}

export default AddExerciseButton