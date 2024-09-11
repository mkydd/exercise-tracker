import React from 'react'
import { default as AllExercises } from '../../components/Workout/Exercises'
import '../../styles/user/exercises.css'

function Exercises() {
  return (
    <div className='all-exercises'>
      <h1>Exercises</h1>
      <AllExercises handleClick={() => null}/>
    </div>
  )
}

export default Exercises