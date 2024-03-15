import React, { useEffect, useState } from 'react'

function CurrentExercises({ exercises, removeExercise }) {
  const [allSets, setAllSets] = useState([])

  function addSet(exercise) {
    let updated = false;
    allSets.forEach((exerciseSets, index) => {
      console.log('looooop')
      if (exerciseSets.exerciseId === exercise.id) {
        let lastSet = exerciseSets.sets.reduce(
          (prev, current) => {
            return prev.setNumber > current.setNumber ? prev : current
          }
        )

        let lastSetNum = lastSet.setNumber
        console.log('lastSetNum =', lastSetNum)
        let newArr = [...allSets]
        newArr[index].sets = [...exerciseSets.sets, {setNumber: lastSetNum+1, reps: 0}]
        setAllSets(newArr);
        console.log('after update')
        updated = true;
        return
      }
    })

    if (!updated) {
      setAllSets([...allSets, {exerciseId: exercise.id, sets: [{setNumber: 1, reps: 0}]}])
    }
  }

  function displaySets(exercise) {
    let exerciseSets = allSets.filter((elem) => exercise.id === elem.exerciseId)
    let sets

    if (exerciseSets.length > 0) {
      console.log(9999)
      sets = exerciseSets[0].sets.map((set) => {
        return <li key={`${exercise.id}-${set.setNumber}`}>Set Number: {set.setNumber} - Reps: {set.reps}</li>
      })
    }

    return sets
  }

  useEffect(() => {
    console.log('allSets =', allSets)
  }, [allSets])


  return (
    <div>
      <ul>
        {exercises.map((exercise) => {
          return (
              <li key={exercise.id} style={{display: 'flex', flexWrap: 'wrap'}}>
                <div onClick={() => removeExercise(exercise)} >{exercise.name}</div> -
                <button onClick={() => addSet(exercise)}>Add Set</button>
                <ul>
                  {allSets.length > 0 ? displaySets(exercise) : null}
                </ul>
              </li>)
        })}
      </ul>
    </div>
  )
}

export default CurrentExercises