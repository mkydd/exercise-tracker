import React from 'react'

function ConfirmationPrompt({ msg, onConfirm, closePrompt, display }) {

  return (
    <div>
      {display &&
      <div className="confirmation-prompt">
        <div className="message">{msg}</div>
        <div className="buttons">
          <button 
            className="accept" 
            onClick={() => {
              closePrompt(false)
              onConfirm()
            }}
          >Confirm</button>

          <button 
            className="decline" 
            onClick={() => closePrompt()}
          >Cancel</button>
        </div>
      </div>
      }
    </div>
  )
}

export default ConfirmationPrompt