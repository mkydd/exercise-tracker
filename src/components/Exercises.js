import React, { useEffect, useState } from 'react'
import { getData } from '../util/Exercises';

function Exercises() {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    getData().then(results => {
      setExercises(results)
    })
  }, [])

  return (
    <div>
      {console.log(exercises)}
      <ul>
        {exercises.map(exercise => {
          return <li key={exercise.id}>{exercise.name}</li>
        })}
      </ul>
    </div>
  )
}

export default Exercises