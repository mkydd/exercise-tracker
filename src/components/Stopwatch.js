import React, { useEffect, useState } from 'react'

function Stopwatch() {
  const [time, setTime] = useState({hours: 0, minutes: 0, seconds:0})
  const [start, setStart] = useState(false)
  
  useEffect(() => {
    if (!start) return
    setTimeout(() => {
      setTime({...time, seconds: time.seconds+1})
      console.log("Time:", time)
    }, 1000);
  }, [time, start])

  return (
    <div>
      <button onClick={() => {setStart(true)}}>Start Workout</button>
      <br />
      {time.hours > 0 ? time.hours : null}
      {time.minutes > 0 ? time.minutes : null}
      {time.seconds > 0 ? time.seconds : null}
      <br />
      <button onClick={() => {setStart(false)}}>End Workout</button>
    </div>
  )
}

export default Stopwatch