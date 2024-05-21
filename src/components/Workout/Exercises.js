import React, { useState } from 'react'
// import { useEffect, useState } from 'react';
// import { getData } from '../util/getExercises';
import { allExercises } from '../../util/Data';

function Exercises({ onClickFunction }) {
  // const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState(allExercises)
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // useEffect(() => {
  //   getData().then(results => {
  //     setExercises(results)
  //   })
  // }, [])

  function filterExercise(bodyPart) {
    if (bodyPart === selectedBodyPart) {
      setSelectedBodyPart('')
      if (searchQuery) {
        setSelectedExercises(allExercises.filter((exercise) => {
            return exercise.name.indexOf(searchQuery) !== -1
        }))
        return
      }
      setSelectedExercises(allExercises)
      return
    }
    setSelectedExercises(() => allExercises.filter((exercise) => {
      if (searchQuery) {
        return exercise.bodyPart === bodyPart && exercise.name.indexOf(searchQuery) !== -1
      }
      return exercise.bodyPart === bodyPart}))
    setSelectedBodyPart(bodyPart)
    console.log('search =', searchQuery)
    console.log('selectedExercises =', selectedExercises)
  }

  function searchOnChange(exerciseName) {
    // console.log('exerciseName =', exerciseName)
    setSearchQuery(exerciseName)
    setSelectedExercises(allExercises.filter((exercise) => {
      if (selectedBodyPart) {
        return exercise.name.indexOf(exerciseName) !== -1 && exercise.bodyPart === selectedBodyPart
      }
      return exercise.name.indexOf(exerciseName) !== -1
      }
    ))
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
                <div className="exercise-name">{exercise.name}</div>
                <div className="exercise-bodypart">{exercise.bodyPart}</div>
                </li>
          })}
        </ul>}
    </div>
  )
}

export default Exercises;