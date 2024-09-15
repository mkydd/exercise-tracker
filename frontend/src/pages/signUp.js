import React, { useState } from 'react'

function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function createUser(e) {
    e.preventDefault()

    fetch("http://localhost:5001/api/v1/users", {
      method: 'POST',
      body: JSON.stringify({
        name: {
          firstName,
          lastName
        },
        email,
        password   
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div>
      <form onSubmit={(e) => createUser(e)}>
        <label htmlFor="firstName">First name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br /><br />

        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default SignUp