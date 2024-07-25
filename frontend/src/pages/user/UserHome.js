import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import getData from '../../util/fetchUserData';

function UserHome() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState({})

  useEffect(() => {
    setUserData(getData(user.email))
  }, [userData, user])

  return (
    <div>
      UserHome
      <button>Start New Workout</button>
      <h2>Previous Workout</h2>

    </div>
  )
}

export default UserHome;