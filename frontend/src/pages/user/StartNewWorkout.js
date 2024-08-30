import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import '../../styles/user/startNewWorkout.css'
import Template from '../../components/user/Template';

function StartNewWorkout() {
  const { userWorkouts } = useOutletContext()
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    if (userWorkouts) {
      setTemplates(userWorkouts)
    }
  }, [userWorkouts])
  
  return (
    <div className='user-home'>
      <h1>Start Workout</h1>
      <button className='start-workout'>Start an Empty Workout</button>
      <div className="template-header">
        <h2>Templates</h2>
        <button>+Template</button>
      </div>
      <div>
        <ul className="templates">
          {templates.map((workout) => {
            return (
              <li key={workout._id}>
                <Template workout={workout} />
              </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default StartNewWorkout;