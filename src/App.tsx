import { useState } from 'react'
import { motion } from 'framer-motion'
import kittyhausLogo from '/kittyhausTextLogo.svg'
import './App.css'
import YouTube from './YouTube.tsx'
import Menu from './Menu.tsx'
import Page from './Page.tsx'
import { PAGES } from './constants.tsx'

export default function App() {
	const [ pageName, setPageName ] = useState(PAGES.MAIN)

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
    </>
  )
}
