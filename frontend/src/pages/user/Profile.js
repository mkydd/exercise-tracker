import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import '../../styles/user/profile.css'
import { useOutletContext } from 'react-router-dom'
import DeleteUserButton from '../../components/user/DeleteUserButton'
import UserInfoInput from '../../components/UserInfoInput'
import LogoutButton from '../../auth/logout';
import ResendEmailVerificationBtn from '../../components/user/ResendEmailVerificationBtn';
import Banner from '../../util/Banner';

function Profile() {
  const { userWorkouts, userData, auth0UserId, setUserData } = useOutletContext()
  const [user, setUser] = useState()
  const [auth0Id, setAuth0Id] = useState('')
  const [displayUserInputPrompt, setDisplayUserInputPrompt] = useState(false)
  const [initials, setInitials] = useState('')
  const [showBanner, setShowBanner] = useState('')
  const [bannerStatus, setBannerStatus] = useState('')
  const [bannerMsg, setBannerMsg] = useState('')

  const { getAccessTokenSilently } = useAuth0()


  useEffect(() => {
    if (userData) {
      console.log('user =', user)
      setUser(userData)
      setInitials(newInitials(userData))
    }
  }, [userData, user])

  useEffect(() => {
    if (auth0UserId) {
      setAuth0Id(auth0UserId)
    }
  }, [auth0UserId])

  function displayBanner(status, msg) {
    setBannerStatus(status)
    setShowBanner(true)
    setBannerMsg(msg)
  }

  async function updateUserInfo(userInfo) {
    const token = await getAccessTokenSilently()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userData._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userInfo)
    })

    console.log("UpdateUserInfo status =", res.status)

    if (res.status === 200) {
      setUserData({...user, ...userInfo})
      displayBanner('success', 'User Info Successfully Updated')
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

  function onClose() {
    if (!user.name.firstName || !user.name.lastName) {
      alert("Please enter a valid First Name and Last Name")
      return
    }
    setDisplayUserInputPrompt(false)
  }

  return (
    <div className='profile'>
      <Banner 
        status={bannerStatus}
        display={showBanner}
        setDisplay={setShowBanner}
        msg={bannerMsg}/>
      <h1>Profile</h1>

      {user && (!user.name.firstName || !user.name.lastName || displayUserInputPrompt) && 
      <UserInfoInput 
        user={user} 
        onConfirm={updateUserInfo}
        closePrompt={onClose}
        setDisplay={setDisplayUserInputPrompt}/>}

      <div className="profile-header">
        <div className="initials">
          {initials}
        </div>
        <div className="email">
          {user && user.email}
        </div>
      </div>

      <div className="is-verified-wrapper">
        <div className="verified-label">Account Verified:</div> 
        { user && <div>{ user.isVerified ? <div>&#x2705;</div> : <div>&#x274C;</div> }</div> }
        {user && !user.isVerified && <ResendEmailVerificationBtn auth0Id={auth0Id}/>}
      </div>

      <div className="stats">
      <h2>Stats</h2>
        <div className="stat total-workouts">
          Total Workouts: <div>{userWorkouts.length}</div>
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
      <LogoutButton />
    </div>
  )
}

export default Profile