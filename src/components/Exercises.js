import React, { useState } from 'react'
// import { useEffect, useState } from 'react';
// import { getData } from '../util/getExercises';
import { allExercises } from '../util/Data';

function Exercises() {
  // const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])

  // useEffect(() => {
  //   getData().then(results => {
  //     setExercises(results)
  //   })
  // }, [])

  return (
    <div>
      <button onClick={() => setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === 'chest'))}>Chest</button>
      <button onClick={() => setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === 'back'))}>Back</button>
      <button onClick={() => setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === 'upper arms'))}>Arms</button>
      <button onClick={() => setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === 'shoulders'))}>Shoulders</button>
      <button onClick={() => setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === 'waist'))}>Core</button>
      <button onClick={() => setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === 'upper legs'))}>Legs</button>
      {selectedExercises && <ul>
          {selectedExercises.map((exercise) => {
            return <li key={exercise.id}>{exercise.name}</li>
          })}
        </ul>}
    </div>
  )
}

export default Exercises;