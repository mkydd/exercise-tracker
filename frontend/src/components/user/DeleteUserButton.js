import React, { useState } from 'react'
import ConfirmationPrompt from '../ConfirmationPrompt'

export default function DeleteUserButton() {
  const [showPrompt, setShowPrompt] = useState(false)
  const message = "Are you sure you want to delete your account. This is an irreversible action"

  function deleteAccount() {

  }
  
  return (
    <div>
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
