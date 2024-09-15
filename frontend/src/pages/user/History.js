import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import PreviousWorkout from '../../components/user/PreviousWorkout'
import '../../styles/user/history.css'
import NoWorkoutsMsg from '../../components/NoWorkouts'
import Banner from '../../util/Banner';

function History() {
  const { userData, userWorkouts, setUserWorkouts } = useOutletContext()
  const [showBanner, setShowBanner] = useState(false)
  const [bannerStatus, setBannerStatus] = useState('')
  const [bannerMsg, setBannerMsg] = useState('')

  return (
    <div className='history'>
      <Banner 
        status={bannerStatus}
        display={showBanner}
        setDisplay={setShowBanner}
        msg={bannerMsg}/>
      <h1>History</h1> 
      <ul className='workouts'>
        <NoWorkoutsMsg />
        {userWorkouts && userWorkouts.map((workout, index) => {
          return (
            <li key={`history ${workout._id}`}>
              <PreviousWorkout
               workout={workout}
               allWorkouts={userWorkouts}
               updateWorkouts={setUserWorkouts}
               workoutIndex={index}
               userId={userData._id}
               setShowBanner={setShowBanner}
               setBannerStatus={setBannerStatus}
               setBannerMsg={setBannerMsg}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default History