import React from 'react'
// import { useEffect, useState } from 'react';
// import { getData } from '../util/getExercises';
import { allExercises } from '../util/Data';

function Exercises() {
  // const [exercises, setExercises] = useState([])

  // useEffect(() => {
  //   getData().then(results => {
  //     setExercises(results)
  //   })
  // }, [])

  return (
    <div>
      {console.log(allExercises)}
      <ul>
        {allExercises.map(exercise => {
          return <li key={exercise.id}>{exercise.name}</li>
        })}
      </ul>
    </div>
  )
}

export default Exercises