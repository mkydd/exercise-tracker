import React, { useState } from 'react'
import ConfirmationPrompt from '../ConfirmationPrompt'
import '../../styles/components/deleteUserButton.css'

export default function DeleteUserButton() {
  const [showPrompt, setShowPrompt] = useState(false)
  const message = "Are you sure you want to delete your account? This is an irreversible action"

  function deleteAccount() {

  }

  return (
    <div className='delete-user-button'>
      <button className="delete-user" onClick={() => setShowPrompt(true)}>Delete Account</button>
      {showPrompt && 
      <ConfirmationPrompt 
        msg={message} 
        onConfirm={() => deleteAccount()} 
        closePrompt={() => setShowPrompt(false)}
        display={showPrompt}/>
      }
    </div>
  )
}
