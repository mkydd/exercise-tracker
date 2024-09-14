import React, { useState } from 'react'
import ConfirmationPrompt from '../ConfirmationPrompt'
import '../../styles/components/deleteUserButton.css'
import { useAuth0 } from "@auth0/auth0-react";
import Loading from '../../util/Loading';

export default function DeleteUserButton({ auth0UserId }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const message = "Are you sure you want to delete your account? This is an irreversible action."
  const { logout, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false)



  async function deleteAccount(auth0UserId) {
    const token = await getAccessTokenSilently()
    await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${auth0UserId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
    
    localStorage.setItem('deletedUser', 'true')

    logout()
  }

  return (
    <div className='delete-user-button'>
      { loading && <Loading /> }
      <button className="delete-user" onClick={() => setShowPrompt(true)}>Delete Account</button>
      {showPrompt && 
      <ConfirmationPrompt 
        msg={message} 
        onConfirm={() => {
          setLoading(true)
          deleteAccount(auth0UserId)
        }} 
        closePrompt={() => setShowPrompt(false)}
        display={showPrompt}/>
      }
    </div>
  )
}
