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
          newArr[index].sets = [...exerciseSets.sets, {setNumber: lastSetNum+1, reps: 0, weight: 0}]
          setAllSets(newArr);
          // console.log('after update')
          updated = true;
          return
        } else {
          let newArr = [...allSets]
          newArr[index].sets = [{setNumber: 1, reps: 0, weight: 0}]
          setAllSets(newArr);
          // console.log('after update')
          updated = true;
          return
        }
      }  
    })

    if (!updated) {
      setAllSets([...allSets, {exerciseId: exercise.id, sets: [{setNumber: 1, reps: 0, weight: 0}]}])
    }
  }

  function weightOnChange(exercise, setNumber, newWeight) {
    let setData = {...allSets.filter((sets) => sets.exerciseId === exercise.id)[0]}
    let cloneSetData = Object.assign({}, setData)
    cloneSetData.sets.forEach((set) => {
      if (set.setNumber === setNumber) {
        set.weight = newWeight
      }
    })

    let newArr = allSets.filter((sets) => sets.exerciseId !== exercise.id)
    newArr.push(cloneSetData)
    setAllSets(newArr)
  }

  function displaySets(exercise) {
    let exerciseSets = allSets.filter((elem) => exercise.id === elem.exerciseId)
    let sets

    if (exerciseSets.length > 0) {
      // console.log(9999)
      sets = exerciseSets[0].sets.map((set) => {
        return (
          <li key={`${exercise.id}-${set.setNumber}`} className='current-exercise-set'>
            <div className="set-header">
              <div className="set">Set</div>
              <div className="weight">lbs</div>
              <div className="Reps">Reps</div>
            </div>
            <div className="set-data">
              <div className="set-number">{set.setNumber}</div>
              <div className="weight">
                <input 
                  type="number" 
                  id={`weight-${exercise.id}-${set.setNumber}`} 
                  name="weight" 
                  onChange={(e) => weightOnChange(exercise, set.setNumber, e.target.value)}
                  value={set.weight}>
                </input>
              </div>
              <div className="reps">
                <input 
                  type="number" 
                  id={`reps-${exercise.id}-${set.setNumber}`} 
                  name="reps" 
                  onChange={(e) => repsOnChange(exercise, set.setNumber, e.target.value)}
                  value={set.reps}>
                </input>
              </div>
            </div>
            <div className="set-buttons-wrapper">
              <div className="remove-button">
                <button onClick={() => removeSet(exercise, set.setNumber)}>Remove Set</button>
              </div>
              {/* <div className="rep-buttons">
                <button onClick={() => incrementReps(exercise, set.setNumber)}>+</button>
                <button onClick={() => decrementReps(exercise, set.setNumber)}>-</button>
              </div> */}
            </div>
            
          </li>)
      })
    }

    return sets
  }

  function repsOnChange(exercise, setNumber, reps) {
    let setData = {...allSets.filter((sets) => sets.exerciseId === exercise.id)[0]}
    let cloneSetData = Object.assign({}, setData)
    cloneSetData.sets.forEach((set) => {
      if (set.setNumber === setNumber) {
        set.reps = reps
      }
    })
    // console.log('cloneSetData =', cloneSetData)
    // console.log('allSets.filter((sets) => sets.exerciseId !== exercise.id) =', allSets.filter((sets) => sets.exerciseId !== exercise.id))

    let newArr = allSets.filter((sets) => sets.exerciseId !== exercise.id)
    newArr.push(cloneSetData)
    console.log('New Reps =', newArr)
    setAllSets(newArr)
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
      <ul className='current-exercises-list'>
        {exercises.map((exercise) => {
          return (
              <li key={exercise.id} className='current-exercise'>
                <div onClick={() => removeExerciseOnClick(exercise)} >{exercise.name}</div> -
                <button onClick={() => addSet(exercise)}>Add Set</button>
                <ul className='sets'>
                  {allSets.length > 0 ? displaySets(exercise) : null}
                </ul>
              </li>)
        })}
      </ul>
    </div>
  )
}

export default CurrentExercises