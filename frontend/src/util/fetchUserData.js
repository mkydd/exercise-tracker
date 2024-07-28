async function getUserData(userEmail) {
  const userData = await fetch(`/api/v1/users/data/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: userEmail
    })
  })
    .then(res => res.json())
    .then(data => {
      return data
    })

  console.log('the user data =', userData)
  return userData
}

export default getUserData;