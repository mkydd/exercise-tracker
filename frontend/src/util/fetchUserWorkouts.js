
async function getWorkoutData(userId, auth0Token) {
  const workoutData = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/workouts/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth0Token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
  
  return workoutData
}

export default getWorkoutData;