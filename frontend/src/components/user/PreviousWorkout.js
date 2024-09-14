import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import ConfirmationPrompt from '../ConfirmationPrompt'
import months from '../../util/months'
import DetailedWorkoutHistory from './DetailedWorkoutHistory'
import BasicWorkoutHistory from './BasicWorkoutHistory'
import UpdateWorkoutPrompt from '../UpdateWorkoutPrompt'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function PreviousWorkout({ userId, workout, allWorkouts, updateWorkouts, workoutIndex, setShowBanner, setBannerStatus, setBannerMsg }) {
  const { userData, setUserWorkouts } = useOutletContext()
  const { getAccessTokenSilently } = useAuth0()
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [promptDisplay, setDisplayPrompt] = useState(false)
  const msg = 'Are you sre you want to delete this workout?'

  // FOR TESTING
  // useEffect(() => {
  //   console.log('workout =', workout)
  // }, [workout])

  function displayBanner(status, msg) {
    setBannerStatus(status)
    setShowBanner(true)
    setBannerMsg(msg)
  }

  async function deleteWorkout(workoutId, userId) {
    console.log('workout =', workout)
    const token = await getAccessTokenSilently()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userId
      })
    })

    if (res.status === 200) {
      displayBanner('success', 'Workout Deleted Successfully')
    } else {
      displayBanner('error', 'Unable to Delete Workout')
    }

    const newWorkouts = allWorkouts.filter(workout => workout._id !== workoutId)
    updateWorkouts(newWorkouts)
  }
  
  return (
    <div className='previous-workout'>
      <div className="previous-workout-header">
        <div className='name'>
          <h3>{workout.name}</h3>
        </div>
        { !showUpdatePrompt &&
          <button 
            className='delete-previous-workout-button' 
            onClick={() => setDisplayPrompt(true)}>X</button>}
      </div>
      <div className='date'>
        {workout.date.day}
        &nbsp;
        {months[workout.date.month]}
        &nbsp;
        {workout.date.year}
      </div>
      <div className="time-wrapper">
        <AccessTimeIcon style={{fontSize: 'small'}}/>
        <div className="time">
          {workout.duration.hours ? `${workout.duration.hours}h `: ''}
          {workout.duration.minutes ? `${workout.duration.minutes}m `: ''}
          {workout.duration.seconds ? `${workout.duration.seconds}s`: ''}
          </div>
      </div>
      <div className="exercises">
        { !showMore && !showUpdatePrompt &&
          <BasicWorkoutHistory 
            workout={workout}
            onClick={setShowMore}/> }

        { showMore && !showUpdatePrompt &&
          <DetailedWorkoutHistory 
            workout={workout}
            onClick={setShowMore}/> }
      </div>

      <div className="show-update-prompt-button-wrapper">
        { !showUpdatePrompt && 
          <button 
            className='show-update-prompt-button'
            onClick={() => setShowUpdatePrompt(true)}>Update Workout</button>}
      </div>
      { showUpdatePrompt &&
        <UpdateWorkoutPrompt 
          closePrompt={() => setShowUpdatePrompt(false)}
          setUserWorkouts={setUserWorkouts}
          allWorkouts={allWorkouts}
          workoutIndex={workoutIndex}
          userId={userId}
          setShowBanner={setShowBanner}
          setBannerStatus={setBannerStatus}
          setBannerMsg={setBannerMsg}/>
      }

      <ConfirmationPrompt 
        display={promptDisplay}
        msg={msg}
        closePrompt={() => setDisplayPrompt(false)}
        onConfirm={() => deleteWorkout(workout._id, userData._id)}/>
    </div>
  )
}

export default PreviousWorkout