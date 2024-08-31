import React, { useState, useEffect } from 'react'

import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CurrentExercises from './CurrentExercises';

import { useOutletContext } from 'react-router-dom';

import '../../styles/workout.css'

function Workout() {
  const { userData } = useOutletContext()
  const [currentExercises, setCurrentExercises] = useState([])
  const [time, setTime] = useState({hours: 0, minutes: 0, seconds:0})
  const [allSets, setAllSets] = useState([])
  const [workoutName, setWorkoutName] = useState('Workout')

  const [currDate, setCurrDate] = useState({ day: '', month: '', year: '' })

  useEffect(() => {
    const today = new Date();
    setCurrDate({
      day: today.getDate(),
      month: today.getMonth()+1,
      year: today.getFullYear()
    })
  }, [])

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
    const workout = await fetch(`/api/v1/users/workouts/${userData._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        exercises: allSets,
        name: workoutName,
        date: currDate
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
    // console.log('name =', workoutName)
    // console.log('setData =', allSets)
    saveWorkout()
  }
  
  return (
    <div className='workout'>
      <WorkoutHeader 
        workoutName={workoutName} 
        setWorkoutName={setWorkoutName}/>

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