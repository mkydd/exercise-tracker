import React, { useEffect, useState } from 'react'

function CurrentExercises({ exercises, removeExercise }) {
  const [allSets, setAllSets] = useState([])

  function addSet(exercise) {
    let updated = false;
    allSets.forEach((exerciseSets, index) => {
      // console.log('looooop')
      if (exerciseSets.exerciseId === exercise.id) {
        if (exerciseSets.sets.length > 0) {
          let lastSet = exerciseSets.sets.reduce(
            (prev, current) => {
              return prev.setNumber > current.setNumber ? prev : current
            }
          )
  
          let lastSetNum = lastSet.setNumber
          // console.log('lastSetNum =', lastSetNum)
          let newArr = [...allSets]
          newArr[index].sets = [...exerciseSets.sets, {setNumber: lastSetNum+1, reps: 0}]
          setAllSets(newArr);
          // console.log('after update')
          updated = true;
          return
        } else {
          let newArr = [...allSets]
          newArr[index].sets = [{setNumber: 1, reps: 0}]
          setAllSets(newArr);
          // console.log('after update')
          updated = true;
          return
        }
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
      // console.log(9999)
      sets = exerciseSets[0].sets.map((set) => {
        return (
          <li key={`${exercise.id}-${set.setNumber}`}>
            Set Number: {set.setNumber} | Reps: {set.reps}
            <button onClick={() => incrementReps(exercise, set.setNumber)}>+</button>
            <button onClick={() => decrementReps(exercise, set.setNumber)}>-</button>
            <button onClick={() => removeSet(exercise, set.setNumber)}>Remove</button>
          </li>)
      })
    }

    return sets
  }

  function incrementReps(exercise, setNumber) {
    let setData = {...allSets.filter((sets) => sets.exerciseId === exercise.id)[0]}
    let cloneSetData = Object.assign({}, setData)
    cloneSetData.sets.forEach((set) => {
      if (set.setNumber === setNumber) {
        set.reps++
      }
    })
    // console.log('cloneSetData =', cloneSetData)
    // console.log('allSets.filter((sets) => sets.exerciseId !== exercise.id) =', allSets.filter((sets) => sets.exerciseId !== exercise.id))

    let newArr = allSets.filter((sets) => sets.exerciseId !== exercise.id)
    newArr.push(cloneSetData)
    setAllSets(newArr)
  }

  function decrementReps(exercise, setNumber) {
    let setData = {...allSets.filter((sets) => sets.exerciseId === exercise.id)[0]}
    let cloneSetData = Object.assign({}, setData)
    cloneSetData.sets.forEach((set) => {
      if (set.setNumber === setNumber && set.reps > 0) {
        set.reps--
      }
    })
    // console.log('cloneSetData =', cloneSetData)
    // console.log('allSets.filter((sets) => sets.exerciseId !== exercise.id) =', allSets.filter((sets) => sets.exerciseId !== exercise.id))

    let newArr = allSets.filter((sets) => sets.exerciseId !== exercise.id)
    newArr.push(cloneSetData)
    setAllSets(newArr)
  }

  function removeExerciseOnClick(exercise) {
    removeExercise(exercise)
    setAllSets(allSets.filter((sets) => sets.exerciseId !== exercise.id))
  }

  function removeSet(exercise, setNumber) {
    console.log('Starting to remove set')
    let setData = allSets.filter((sets) => sets.exerciseId === exercise.id)[0]
    console.log('setData =', setData)
    let cloneSetData = Object.assign({}, setData)
    let newSets = []

    cloneSetData.sets.forEach((set) => {
      if (set.setNumber !== setNumber) {
        if (set.setNumber < setNumber) {
          newSets.push(set)
        } else {
          newSets.push({...set, setNumber: set.setNumber - 1})
        }
      }
    })

    cloneSetData = {...cloneSetData, sets: newSets}

    let newArr = allSets.filter((sets) => sets.exerciseId !== exercise.id)
    newArr.push(cloneSetData)
    setAllSets(newArr)
  }
  
  useEffect(() => {
    // console.log('allSets =', allSets)
  }, [allSets])

  return (
    <div>
      <ul>
        {exercises.map((exercise) => {
          return (
              <li key={exercise.id} style={{display: 'flex', flexWrap: 'wrap'}}>
                <div onClick={() => removeExerciseOnClick(exercise)} >{exercise.name}</div> -
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