import React, { useState, useEffect } from 'react'

import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CurrentExercises from './CurrentExercises';

import { useOutletContext, useLocation } from 'react-router-dom';

import '../../styles/workout.css'

function Workout() {
  const { userData } = useOutletContext()
  const [currentExercises, setCurrentExercises] = useState([])
  const [allSets, setAllSets] = useState([])
  const [workoutName, setWorkoutName] = useState('Workout')

  const { state } = useLocation();

  const [currDate, setCurrDate] = useState({ day: '', month: '', year: '' })

  useEffect(() => {
    // used to recieve props from previous page when user starts from old workout
    if (state && state.workout) {
    console.log('state =', state)
      setAllSets(state.workout.exercises)
      let allExercises = []
      state.workout.exercises.forEach((exercise) => {
        allExercises.push({
          id: exercise.exerciseId,
          name: exercise.exerciseName
        })
      })
      setCurrentExercises(allExercises)
    }
  }, [state])

  useEffect(() => {
    const today = new Date();
    setCurrDate({
      day: today.getDate(),
      month: today.getMonth()+1,
      year: today.getFullYear()
    })
  }, [])

  // USED FOR TESTING
  // useEffect(() => {
  //   console.log('time W =', time)
  // }, [time])

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

  async function saveWorkout(time) {
    console.log('(save) time =', time)
    const workout = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/workouts/${userData._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        exercises: allSets,
        name: workoutName,
        date: currDate,
        duration: time
      })
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
    
    console.log(workout)
  }
  
  return (
    <div className='workout'>
      <WorkoutHeader 
        workoutName={workoutName} 
        setWorkoutName={setWorkoutName}/>

      <Stopwatch saveWorkout={saveWorkout}/>

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