import React, { useState } from 'react'
import ConfirmationPrompt from '../ConfirmationPrompt'
import '../../styles/components/deleteUserButton.css'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

export default function DeleteUserButton({ auth0UserId }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const message = "Are you sure you want to delete your account? This is an irreversible action."
  const [redirect, setRedirect] = useState(false)
  const { logout, getAccessTokenSilently } = useAuth0();



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
    
    logout()
    
    setTimeout(() => {
      setRedirect(true)
    }, 1000);
  }

  return (
    <div className='delete-user-button'>
      <button className="delete-user" onClick={() => setShowPrompt(true)}>Delete Account</button>
      {showPrompt && 
      <ConfirmationPrompt 
        msg={message} 
        onConfirm={() => deleteAccount(auth0UserId)} 
        closePrompt={() => setShowPrompt(false)}
        display={showPrompt}/>
      }
      {redirect && <Navigate to='/' />}
    </div>
  )
}
