async function getUserData(userEmail) {
  const userData = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/data/`, {
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

  return userData
}

export default getUserData;