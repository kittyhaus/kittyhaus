import { useState } from 'react'
import { motion } from 'framer-motion'
import kittyhausLogo from '/kittyhaus-logo.svg'
import fullscreenIcon from '/fullscreen.svg'
import './App.css'
import YouTube from './YouTube.tsx'
import Menu from './Menu.tsx'
import Page from './Page.tsx'
import { PAGES } from './constants.tsx'

export default function App() {
	const [ pageName, setPageName ] = useState(PAGES.MAIN)


  const isFullScreen = (): boolean => {
    return document.fullscreenElement !== null
  }
  const enterFullScreen = () => {
    const root = document.getElementById('root')
    root?.requestFullscreen().then(() => {
    })
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

  return (
    <>
      <motion.img
        src={kittyhausLogo}
        className="logo"
        alt="Kittyhaus logo"
        whileHover={{ y: '-25px' }}
        whileTap={{ y: '-25px' }}
      />
      <div className='wrapper-container'>
        <div className='wrapper-left-container'>
          <div className='subtitle-container'>NOW PLAYING</div>
        <div className='title-container'><p data-text='KITTYHAUS'>KITTYHAUS</p><p data-text='SZN.01'>SZN.01</p></div>
        </div>
        <div className='wrapper-right-container'>
          <Menu pageName={pageName} setPageName={setPageName}/>
          <Page pageName={pageName} setPageName={setPageName}/>
        </div>
      </div>
      <YouTube embedId={`EjDmlmBymG4`} />
      <button className='fullscreen-btn' onClick={() => handleFullScreenBtnClick() }><img className='fullscreen-btn-img' src={fullscreenIcon} alt='toggle fullscreen' /></button>
    </>
  )
}
