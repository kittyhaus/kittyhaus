import { useState } from 'react'
import { motion } from 'framer-motion'
import kittyhausLogo from '/kittyhaus-logo.svg'
import './App.css'
import YouTube from './YouTube.tsx'
import Menu from './Menu.tsx'
import Page from './Page.tsx'
import Controls from './Controls.tsx'
import { PAGES } from './constants.tsx'



export default function App() {
	const [ pageName, setPageName ] = useState(PAGES.MAIN)
  const [ showMenu, setShowMenu ] = useState(true)

  return (
    <>
      <motion.img
        src={kittyhausLogo}
        className="logo"
        alt="Kittyhaus logo"
        whileHover={{ y: '-25px' }}
        whileTap={{ y: '-25px' }}
      />
      <div className='flex-container'>
        <div className='row'>
          <div className='subtitle-container'>NOW PLAYING</div>
          <div className='title-container'><p data-text='KITTYHAUS'>KITTYHAUS</p></div>
          <div className='title-container'><p data-text='SZN.01'>SZN.01</p></div>
        </div>
        <div className='row menu'>
          <Menu pageName={pageName} setPageName={setPageName} showMenu={showMenu} setShowMenu={setShowMenu}/>
          <Page pageName={pageName} setPageName={setPageName}/>
        </div>
      </div>
        { showMenu && <div className='overlay-bg' /> }
      <YouTube embedId={`EjDmlmBymG4`} />
      <Controls />
    </>
  )
}
