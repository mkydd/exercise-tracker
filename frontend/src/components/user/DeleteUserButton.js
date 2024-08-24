import React, { useState } from 'react'
import ConfirmationPrompt from '../ConfirmationPrompt'
import '../../styles/components/deleteUserButton.css'

export default function DeleteUserButton({ auth0UserId }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const message = "Are you sure you want to delete your account? This is an irreversible action."

  async function deleteAccount(auth0UserId) {
    await fetch(`/api/v1/users/${auth0UserId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
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
    </div>
  )
}
