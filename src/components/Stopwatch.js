import React, { useEffect, useState } from 'react'

function Stopwatch() {
  const [time, setTime] = useState({hours: 0, minutes: 0, seconds:57})
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!start) return
    setTimeout(() => {
      if (time.minutes === 59 && time.seconds === 59) {
        setTime({hours: time.hours + 1, minutes: 0, seconds: 0})
        console.log(9999)
        return
      }
  
      if (time.seconds === 59) {
        setTime({...time, minutes: time.minutes + 1, seconds: 0})
        return
      }
  
      setTime({...time, seconds: time.seconds + 1})
      console.log("Time:", time)
    }, 1000);
  }, [time, start])

  function displayTime() {
    let displayTime;
    if (time.hours > 0) {
      displayTime = `${String(time.hours).padStart(2, 0)}:${String(time.minutes).padStart(2, 0)}:${String(time.seconds).padStart(2, 0)}`
      console.log('displayTime', displayTime)
    } else if (time.minutes > 0){
      displayTime = `${String(time.minutes).padStart(2, 0)}:${String(time.seconds).padStart(2, 0)}`
    } else {
      displayTime = `00:${String(time.seconds).padStart(2, 0)}`
    }
    return displayTime
  }

  return (
    <div>
      <button onClick={() => {setStart(true)}}>Start Workout</button>
      <br />
      {displayTime()}
      <br />
      <button onClick={() => {setStart(false)}}>End Workout</button>
    </div>
  )
}

export default Stopwatch