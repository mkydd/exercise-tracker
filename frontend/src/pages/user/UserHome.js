import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function UserHome() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState()

  useEffect(() => {
    fetch(`/api/v1/users/data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'michael.kydd@outlook.com'
      })
    })
      .then(res=>res.json())
      .then(res => console.log(res))
  }, [userData])

  return (
    <div>
      UserHome
      <button>Start New Workout</button>
      <h2>Previous Workout</h2>

    </div>
  )
}

export default UserHome;