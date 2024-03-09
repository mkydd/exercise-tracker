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
  

  useEffect(() => {
    console.log('allSets =', allSets)
  }, [allSets])

  return (
    <div>
      <ul>
        {exercises.map((exercise) => {
          return (
              <li key={exercise.id} >
                {exercise.name} -
                <button onClick={() => addSet(exercise)}>Add Set</button>
                <ul>
                  {allSets.filter((elem) => exercise.id === elem.exerciseId)[0].sets.map((set) => {
                    return <li key={`${exercise.id}-${set.setNumber}`}>Set Number: {set.setNumber} - Reps: {set.reps}</li>
                  })}
                </ul>
              </li>)
        })}
      </ul>
    </div>
  )
}

export default CurrentExercises