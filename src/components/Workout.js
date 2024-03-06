import React from 'react'
import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CompletedExercises from './CompletedExercises';

function Workout() {
  return (
    <div>
      <WorkoutHeader />
      <Stopwatch />
      <AddExerciseButton />
      <CompletedExercises />
    </div>
  )
}

export default Workout