function getData(userEmail) {
  let userData;
  fetch(`/api/v1/users/data/`, {
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
    .then(data => userData = data)
    .then(() => console.log(userData))
  
  return userData
}

export default getData;