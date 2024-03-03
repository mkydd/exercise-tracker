import React, { useState } from 'react'
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

  // function getExercises(bodyParts) {
  //   for (let i=0; i<bodyParts.length; i++) {
      
  //   }
  // }
  const [showChest, setShowChest] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChest(!showChest)}>Chest</button>
      {showChest && <ul>
          {allExercises.filter((exercise) => exercise.bodyPart === 'chest').map((exercise) => {
            return <li key={exercise.id}>{exercise.name}</li>
          })}
        </ul>}
      <button>Back</button>
      <button>Arms</button>
      <button>Shoulders</button>
      <button>Core</button>
      <button>Legs</button>
      {showChest && <ul>
          {allExercises.filter((exercise) => exercise.bodyPart === 'chest').map((exercise) => {
            return <li key={exercise.id}>{exercise.name}</li>
          })}
        </ul>}
    </div>
  )
}

export default Exercises;