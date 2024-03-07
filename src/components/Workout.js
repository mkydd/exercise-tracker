import React from 'react'
import { useState } from 'react';

import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CompletedExercises from './CompletedWorkout';
import CurrentExercises from './CurrentExercises';

function Workout() {
  const [currentExercises, setCurrentExercises] = useState([])
  console.log('currentExercises =', currentExercises)

  function exerciseOnClick(exercise) {
    setCurrentExercises([...currentExercises, exercise])
    console.log('Exercise Added')
  }
  return (
    <div>
      <WorkoutHeader />
      <Stopwatch />
      <CurrentExercises />
      <AddExerciseButton onClickFunction={exerciseOnClick} />
      <CompletedExercises />
    </div>
  )
}

export default Workout