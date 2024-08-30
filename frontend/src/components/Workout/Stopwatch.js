import React, { useEffect, useState } from 'react'
import EndWorkoutButton from './EndWorkoutButton'

function Stopwatch({ onStop }) {
  const [time, setTime] = useState({hours: 0, minutes: 0, seconds:0})
  const [start, setStart] = useState(true)

  useEffect(() => {
    if (!start) return
    setTimeout(() => {
      if (time.minutes === 59 && time.seconds === 59) {
        setTime({hours: time.hours + 1, minutes: 0, seconds: 0})
        return
      }
  
      if (time.seconds === 59) {
        setTime({...time, minutes: time.minutes + 1, seconds: 0})
        return
      }
  
      setTime({...time, seconds: time.seconds + 1})
    }, 1000);
  }, [time, start])

  function displayTime() {
    let displayTime;
    if (time.hours > 0) {
      displayTime = `${String(time.hours).padStart(2, 0)}:${String(time.minutes).padStart(2, 0)}:${String(time.seconds).padStart(2, 0)}`
    } else if (time.minutes > 0){
      displayTime = `${String(time.minutes).padStart(2, 0)}:${String(time.seconds).padStart(2, 0)}`
    } else {
      displayTime = `00:${String(time.seconds).padStart(2, 0)}`
    }
    return displayTime
  }  

  return (
    <div className='stopwatch'>
      <div className="time">
        {displayTime()}
      </div>
      <EndWorkoutButton 
        time={time}
        onFinish={() => {
          setStart(false)
          onStop(time)
        }}/>
    </div>
  )
}

export default Stopwatch