import React from 'react'
import { useState } from 'react';

import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CurrentExercises from './CurrentExercises';

import '../../styles/workout.css'

function Workout() {
  const [currentExercises, setCurrentExercises] = useState([])

  function exerciseOnClick(exercise) {
    if (currentExercises.includes(exercise)) return;

    setCurrentExercises([...currentExercises, exercise])
    // console.log('Exercise Added')
  }

  function removeExercise(exercise) {
    let newArr = []
    for (let i=0; i<currentExercises.length; i++) {
      if (currentExercises[i].id !== exercise.id) {
        newArr.push(currentExercises[i])
      }
    }
    setCurrentExercises(newArr)
    // console.log('Removed ', exercise.name)
  }
  return (
    <div className='workout'>
      <WorkoutHeader />
      <Stopwatch />
      <CurrentExercises exercises={currentExercises} removeExercise={removeExercise} />
      <AddExerciseButton onClickFunction={exerciseOnClick} />
    </div>
  )
}

export default Workout