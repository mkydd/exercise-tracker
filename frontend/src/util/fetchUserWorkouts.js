async function getWorkoutData(userId) {
  const workoutData = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/workouts/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
  
  return workoutData
}

export default getWorkoutData;