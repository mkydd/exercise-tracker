import React, { useState } from 'react'

function CurrentExercises({ exercises, removeExercise }) {
  const [allSets, setAllSets] = useState([])
  function addSet(exercise) {
    allSets.forEach((exerciseSets, index) => {
      if (exerciseSets.exerciseId === exercise.id) {
        setAllSets([...allSets, {...exerciseSets, sets: [{setNumber: 1, reps: 0}]}])
        return
      }
    })
    setAllSets([...allSets, {exerciseId: exercise.id, sets: [{setNumber: 1, reps: 0}]}])
  }
  return (
    <div>
      <ul>
        {exercises.map((exercise) => {
          return (
              <li key={exercise.id} >
                {exercise.name} -
                <button onClick={() => {addSet(exercise)}}>Add Set</button>
                <ul>
                  Sets
                  {console.log('allSets =', allSets)}
                </ul>
                
                {/* <button onClick={}>Add Rep</button> */}
              </li>)
        })}
      </ul>
    </div>
  )
}

export default CurrentExercises