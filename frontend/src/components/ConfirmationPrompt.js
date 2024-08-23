import React from 'react'
import '../styles/components/confirmationPrompt.css'

function ConfirmationPrompt({ msg, onConfirm, closePrompt, display }) {

  return (
    <div>
      {display &&
      <div className="confirmation-prompt-wrapper">
        <div className="confirmation-prompt">
          <div className="message">{msg}</div>
          <div className="buttons">
            <button 
              className="confirm" 
              onClick={() => {
                closePrompt(false)
                onConfirm()
              }}
            >Confirm</button>

            <button 
              className="cancel" 
              onClick={() => closePrompt()}
            >Cancel</button>
          </div>
        </div>
      </div>
      
      }
    </div>
  )
}

export default ConfirmationPrompt