import React, { useEffect, useState } from 'react'
import '../styles/banner.css'

function Banner({ status, display, setDisplay }) {
  const [bannerStyles, setBannerStyles] = useState({})

  useEffect(() => {
    switch (status) {
      case 'error':
        setBannerStyles((prevStyles) => {
          return {...prevStyles, backgroundColor: 'rgb(227, 80, 61)'}
        })
        break;

      case 'success':
        setBannerStyles((prevStyles) => {
          return {...prevStyles, backgroundColor: 'rgb(36, 148, 36)'}
        })
        break;
    
      default:
        break;
    }
  }, [status])
  
  return (
    <div 
      className='banner-wrapper' 
      onAnimationEnd={() => setDisplay(false)}>
      { display &&
        <div 
        className='banner'
        style={bannerStyles}>
          User Deleted Successfully
        </div>
      }
    </div>
  )
}

export default Banner