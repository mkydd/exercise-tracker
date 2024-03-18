import React, { useState } from 'react'
// import { useEffect, useState } from 'react';
// import { getData } from '../util/getExercises';
import { allExercises } from '../../util/Data';

function Exercises({ onClickFunction }) {
  // const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])

  // useEffect(() => {
  //   getData().then(results => {
  //     setExercises(results)
  //   })
  // }, [])

  function filterExercise(bodyPart) {
    setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === bodyPart))
  }

  return (
    <div>
      <button onClick={() => filterExercise('chest')}>Chest</button>
      <button onClick={() => filterExercise('back')}>Back</button>
      <button onClick={() => filterExercise('upper arms')}>Arms</button>
      <button onClick={() => filterExercise('shoulders')}>Shoulders</button>
      <button onClick={() => filterExercise('waist')}>Core</button>
      <button onClick={() => filterExercise('upper legs')}>Legs</button>
      {selectedExercises && <ul>
          {selectedExercises.map((exercise) => {
            return <li key={exercise.id} onClick={() => onClickFunction(exercise)}>{exercise.name}</li>
          })}
        </ul>}
    </div>
  )
}

export default Exercises;