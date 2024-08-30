import React from 'react'
import { useState } from 'react';

import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CurrentExercises from './CurrentExercises';

import '../../styles/workout.css'

function Workout() {
  const [currentExercises, setCurrentExercises] = useState([])
  const [time, setTime] = useState({hours: 0, minutes: 0, seconds:0})
  const [allSets, setAllSets] = useState([])

  function exerciseOnClick(exercise) {
    if (currentExercises.includes(exercise)) return;

    setCurrentExercises([...currentExercises, exercise])
    // console.log('Exercise Added')
  }

  function removeExercise(exercise) {
    console.log('time =', time)
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
      <Stopwatch onStop={(time) => {setTime(time)}}/>
      <CurrentExercises 
        exercises={currentExercises} 
        removeExercise={removeExercise} 
        allSets={allSets}
        setAllSets={setAllSets}/>
      <AddExerciseButton onClickFunction={exerciseOnClick} />
    </div>
  )
}

export default Workout