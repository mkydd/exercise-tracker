import React from 'react'
import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';

function Workout() {
  return (
    <div>
      <WorkoutHeader />
      <Stopwatch />
      <AddExerciseButton />
    </div>
  )
}

export default Workout