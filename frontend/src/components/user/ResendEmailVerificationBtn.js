import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function ResendEmailVerificationBtn({ auth0Id, displayBanner }) {
  const { getAccessTokenSilently } = useAuth0()

  async function resendEmail() {
    const auth0Token = await getAccessTokenSilently()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/verify-email/${auth0Id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth0Token}`
      }
    })

    if (res.status === 200) {
      displayBanner('success', 'Verification Email Successfully Sent')
    }
    console.log('res 999 = ', res.status)
    return res
  }
  return (
    <div className='resend-email-verification'>
      <button 
        className='resend-email-button'
        onClick={resendEmail}>
        Resend Email
      </button>
    </div>
  )
}

export default ResendEmailVerificationBtn