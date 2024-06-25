import fullscreenIcon from '/fullscreen.svg'

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}
export default function Controls() {
  const isFullScreen = (): boolean => {
    return document.fullscreenElement !== null
  }
  const enterFullScreen = () => {
    if (isMobileDevice()) {
      console.log('IS MOBILE DEVICE')
      const ytPlayer = document.querySelector('iframe')
      ytPlayer?.requestFullscreen()
    } else {
      const root = document.getElementById('root')
      root?.requestFullscreen().then(() => {
      })
    }
  }

  const exitFullScreen = () => {
    document.exitFullscreen().then(() => {
    })
  }

  const handleFullScreenBtnClick = () => {
    if (isFullScreen()) {
      exitFullScreen()
    } else {
      enterFullScreen()
    }
  }

  return(
    <button className='fullscreen-btn' onClick={() => handleFullScreenBtnClick() }><img className='fullscreen-btn-img' src={fullscreenIcon} alt='toggle fullscreen' /></button>
  )
}

