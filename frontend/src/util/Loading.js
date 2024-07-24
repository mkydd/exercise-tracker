import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

function Loading() {
  const styles = {
    height: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  
  return (
    <div style={styles}>
      <PulseLoader color='#3D9EE3'/>
    </div>
  )
}

export default Loading