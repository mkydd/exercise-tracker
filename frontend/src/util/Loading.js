import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

function Loading() {
  const styles = {
    height: '100dvh',
    width: '100dvw',
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
  
  return (
    <div style={styles}>
      <PulseLoader color='#3D9EE3'/>
    </div>
  )
}

export default Loading