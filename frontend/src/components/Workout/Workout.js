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

  async function saveWorkout() {
    const workout = await fetch('/api/v1/users/workouts/66d131725301b6a0fe11da70', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        exercises: allSets,
        name: 'temp'
      })
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
    
    console.log(workout)
  }

  function endWorkout(time) {
    setTime(time)
    console.log('setData =', allSets)
    saveWorkout()
  }
  
  return (
    <div className='workout'>
      <WorkoutHeader />
      <Stopwatch onStop={(time) => endWorkout(time)}/>
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