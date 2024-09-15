import React, { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginUser(e) {
    e.preventDefault()
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => loginUser(e)}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login