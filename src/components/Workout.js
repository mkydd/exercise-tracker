import React from 'react'
import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CompletedExercises from './CompletedWorkout';
import CurrentExercises from './CurrentExercises';

function Workout() {
  return (
    <div>
      <WorkoutHeader />
      <Stopwatch />
      <CurrentExercises />
      <AddExerciseButton />
      <CompletedExercises />
    </div>
  )
}

export default Workout