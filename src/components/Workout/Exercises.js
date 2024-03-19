import React, { useState } from 'react'
// import { useEffect, useState } from 'react';
// import { getData } from '../util/getExercises';
import { allExercises } from '../../util/Data';

function Exercises({ onClickFunction }) {
  // const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState(allExercises)
  const [selectedBodyPart, setSelectedBodyPart] = useState('Any Body Part')

  // useEffect(() => {
  //   getData().then(results => {
  //     setExercises(results)
  //   })
  // }, [])

  function filterExercise(bodyPart) {
    setSelectedExercises(() => allExercises.filter((exercise) => exercise.bodyPart === bodyPart))
    setSelectedBodyPart(bodyPart)
    console.log('selectedExercises =', selectedExercises)
  }

  function searchOnChange(exerciseName) {
    // console.log('exerciseName =', exerciseName)
    setSelectedExercises(allExercises.filter((exercise) => exercise.name.indexOf(exerciseName) !== -1 && exercise.bodyPart === selectedBodyPart))
  }

  return (
    <div>
      <div className="search-exercises-wrapper">
        <input type="text" name="search" className='search-exercises' onChange={(e) => searchOnChange(e.target.value)}/>
      </div>
      <button onClick={() => filterExercise('chest')}>Chest</button>
      <button onClick={() => filterExercise('back')}>Back</button>
      <button onClick={() => filterExercise('upper arms')}>Arms</button>
      <button onClick={() => filterExercise('shoulders')}>Shoulders</button>
      <button onClick={() => filterExercise('waist')}>Core</button>
      <button onClick={() => filterExercise('upper legs')}>Legs</button>
      
      {selectedExercises && <ul className='selected-exercises'>
          {selectedExercises.map((exercise) => {
            return <li 
              key={exercise.id} 
              onClick={() => onClickFunction(exercise)} 
              className='selected-exercise'>
                {exercise.name}
                <button className='exercise-info-button'>i</button>
              </li>
          })}
        </ul>}
    </div>
  )
}

export default Exercises;