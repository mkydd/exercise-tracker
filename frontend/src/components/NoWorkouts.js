import React from 'react'
import { useOutletContext } from 'react-router-dom'


function NoWorkoutsMsg() {
  const { userWorkouts } = useOutletContext()
  const myStyles = {
    // textTransform: 'capitalize',
    textAlign: 'center',
    border: '1px solid rgb(61, 158, 227)',
    borderRadius: '0.25rem',
    paddingBlock: '0.25rem'
  }

  return (
    <div style={{ width: '100%' }}>
      { userWorkouts.length === 0 &&
        <div 
          className='no-workouts-message'
          style={myStyles}>
            <div>No Past Workouts</div>
          </div>
      }
    </div>
  )
}

export default NoWorkoutsMsg