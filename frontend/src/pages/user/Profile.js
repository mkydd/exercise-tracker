import React, { useEffect, useState } from 'react'
import '../../styles/user/profile.css'
import { useOutletContext } from 'react-router-dom'
import DeleteUserButton from '../../components/user/DeleteUserButton'
import UserInfoInput from '../../components/UserInfoInput'

function Profile() {
  const { userWorkouts, userData, auth0UserId } = useOutletContext()
  const [workouts, setWorkouts] = useState([])
  const [user, setUser] = useState()
  const [auth0Id, setAuth0Id] = useState('')
  const [displayUserInputPrompt, setDisplayUserInputPrompt] = useState(false)
  const [initials, setInitials] = useState('')

  useEffect(() => {
    if (userWorkouts) {
      setWorkouts(userWorkouts)
    }
  }, [userWorkouts])

  useEffect(() => {
    if (userData) {
      setUser(userData)
      setInitials(newInitials(userData))
    }
  }, [userData])

  useEffect(() => {
    if (auth0UserId) {
      setAuth0Id(auth0UserId)
    }
  }, [auth0UserId])

  async function updateUserInfo(userInfo) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(`/api/v1/users/${userData._id}`, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
      headers: myHeaders
    })

    console.log("res.status =", res.status)

    if (res.status === 200) {
      setUser({...user, ...userInfo})
    }
  }

  function newInitials(newUserData) {
    let new_initials
    try {
      new_initials = newUserData.name.firstName.charAt(0) + newUserData.name.lastName.charAt(0)
    } catch(e) {
      new_initials = newUserData.email.slice(0, 2)
    }
    return new_initials
  }

  return (
    <div className='profile'>
      <h1>Profile</h1>

      {user && (!user.stats.height || !user.stats.weight || !user.stats.age || !user.name.firstName || !user.name.lastName || displayUserInputPrompt) && 
      <UserInfoInput 
        user={user} 
        onConfirm={updateUserInfo}
        setDisplay={setDisplayUserInputPrompt}/>}

      <div className="profile-header">
        <div className="initials">
          {initials}
        </div>
        <div className="email">
          {user && user.email}
        </div>
      </div>
      <div className="stats">
      <h2>Stats</h2>
        <div className="stat total-workouts">
          Total Workouts: <div>{workouts.length}</div>
        </div>
        <div className="stat age">
          Age:&nbsp;<div>{user && user.stats.age}</div>
        </div>
        <div className="stat weight">
          Weight:&nbsp;<div>{user && user.stats.weight}</div><div className='unit'>kg</div>
        </div>
        <div className="stat height">
          Height:&nbsp;<div>{user && user.stats.height}</div><div className='unit'>cm</div>
        </div>
      </div>
      <div className="update-user-info">
        <button onClick={() => setDisplayUserInputPrompt(true)}>Update User Information</button>
      </div>
      <div>
        {user && <DeleteUserButton user={user} auth0UserId={auth0Id}/>}
      </div>
    </div>
  )
}

export default Profile