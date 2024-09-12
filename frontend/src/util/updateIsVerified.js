async function updateIsVerified(userId, auth0Token) {
  const updatedUser = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '',
      'Authorization': `Bearer ${auth0Token}`
    },
    body: JSON.stringify({
      isVerified: true
    })
  })
    .then(res => res.json())
    .then(data => {
      return data
    })

    return updatedUser
}

export default updateIsVerified;