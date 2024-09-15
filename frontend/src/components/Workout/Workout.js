import React, { useState, useEffect } from 'react'

import WorkoutHeader from "./WorkoutHeader";
import Stopwatch from './Stopwatch';
import AddExerciseButton from './AddExerciseButton';
import CurrentExercises from './CurrentExercises';

import { useOutletContext, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import '../../styles/workout.css'

function Workout() {
  const { userData, setUserWorkouts } = useOutletContext()
  const [currentExercises, setCurrentExercises] = useState([])
  const [allSets, setAllSets] = useState([])
  const [workoutName, setWorkoutName] = useState('Workout')

  const { state } = useLocation();
  const { getAccessTokenSilently } = useAuth0()

  const [currDate, setCurrDate] = useState({ day: '', month: '', year: '' })

  useEffect(() => {
    // used to recieve props from previous page when user starts from old workout
    if (state && state.workout) {
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

  function exerciseOnClick(exercise) {
    if (currentExercises.includes(exercise)) return;

    setCurrentExercises([...currentExercises, exercise])
  }

  function removeExercise(exercise) {
    let newArr = []
    for (let i=0; i<currentExercises.length; i++) {
      if (currentExercises[i].id !== exercise.id) {
        newArr.push(currentExercises[i])
      }
    }
    setCurrentExercises(newArr)
  }

  function updateEmptySets() {
    let newSets = [...allSets]
    newSets.forEach((exercise, exerciseIndex) => {
      exercise.sets.forEach((set, setIndex) => {
        if (!set.reps) {
          newSets[exerciseIndex].sets[setIndex].reps = 0
        }
        if (!set.weight) {
          newSets[exerciseIndex].sets[setIndex].weight = 0
        }
      })
    })
    setAllSets(newSets)
  }

  async function saveWorkout(time) {
    const token = await getAccessTokenSilently()
    const { userWorkouts } = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/workouts/${userData._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
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
    
    setUserWorkouts(userWorkouts.workouts)
  }
  
  return (
    <div className='workout'>
      <WorkoutHeader 
        workoutName={workoutName} 
        setWorkoutName={setWorkoutName}/>

      <Stopwatch 
        saveWorkout={saveWorkout}
        updateEmptySets={updateEmptySets}/>

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