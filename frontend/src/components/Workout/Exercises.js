import React, { useState } from 'react'
import { allExercises } from '../../util/Data';
import SearchIcon from '@mui/icons-material/Search';

function Exercises({ onClickFunction }) {
  const [selectedExercises, setSelectedExercises] = useState(allExercises)
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  function filterExercise(bodyPart) {
    if (bodyPart === selectedBodyPart) {
      setSelectedBodyPart('')
      if (searchQuery) {
        setSelectedExercises(allExercises.filter((exercise) => {
            return exercise.name.indexOf(searchQuery) !== -1
        }))
        return
      }
      setSelectedExercises(allExercises)
      return
    }
    setSelectedExercises(() => allExercises.filter((exercise) => {
      if (searchQuery) {
        return exercise.bodyPart === bodyPart && exercise.name.indexOf(searchQuery) !== -1
      }
      return exercise.bodyPart === bodyPart}))
    setSelectedBodyPart(bodyPart)
    console.log('search =', searchQuery)
    console.log('selectedExercises =', selectedExercises)
  }

  function searchOnChange(exerciseName) {
    // console.log('exerciseName =', exerciseName)
    setSearchQuery(exerciseName)
    setSelectedExercises(allExercises.filter((exercise) => {
      if (selectedBodyPart) {
        return exercise.name.indexOf(exerciseName) !== -1 && exercise.bodyPart === selectedBodyPart
      }
      return exercise.name.indexOf(exerciseName) !== -1
      }
    ))
  }

  return (
    <div>
      <div className="search-exercises-wrapper">
        <SearchIcon className='search-icon'/>
        <input type="text" name="search" className='search-exercises' onChange={(e) => searchOnChange(e.target.value.toLowerCase())}/>
      </div>

      <div className="exercise-buttons-wrapper">
        <button 
          onClick={() => filterExercise('chest')}
          className={selectedBodyPart === 'chest' ? 'active exercise-button' : 'exercise-button'}
        >Chest</button>
        <button 
          onClick={() => filterExercise('back')}
          className={selectedBodyPart === 'back' ? 'active exercise-button' : 'exercise-button'}
          >Back</button>
        <button 
          onClick={() => filterExercise('upper arms')}
          className={selectedBodyPart === 'upper arms' ? 'active exercise-button' : 'exercise-button'}
          >Arms</button>
        <button 
          onClick={() => filterExercise('shoulders')}
          className={selectedBodyPart === 'shoulders' ? 'active exercise-button' : 'exercise-button'}
          >Shoulders</button>
        <button 
          onClick={() => filterExercise('waist')}
          className={selectedBodyPart === 'waist' ? 'active exercise-button' : 'exercise-button'}
          >Core</button>
        <button 
          onClick={() => filterExercise('upper legs')}
          className={selectedBodyPart === 'upper legs' ? 'active exercise-button' : 'exercise-button'}
          >Legs</button>
      </div>
      
      {selectedExercises && <ul className='selected-exercises'>
          {selectedExercises.map((exercise) => {
            return <li 
              key={exercise.id} 
              
                onClick={() => onClickFunction(exercise)} 
              className='selected-exercise'>
                <div className="exercise-name">{exercise.name}</div>
                <div className="exercise-bodypart">{exercise.bodyPart}</div>
                </li>
          })}
        </ul>}
    </div>
  )
}

export default Exercises;