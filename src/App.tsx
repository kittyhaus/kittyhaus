import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import kittyhausLogo from '/kittyhaus-logo.svg'
import './App.css'
import YouTube from './YouTube.tsx'
import Menu from './Menu.tsx'
import Page from './Page.tsx'
import { PAGES } from './constants.tsx'
import { useQuery, gql } from '@apollo/client';

export default function App() {
  const [ initialLoad, setInitialLoad ] = useState(true)
  const [ pageName, setPageName ] = useState(PAGES.MAIN)
  const [ showMenu, setShowMenu ] = useState(false)
  const [ isLive, setIsLive ] = useState(false)

  useEffect(() => {
    async function getYoutubeLiveStatus() {
      const url= `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCPov_QpFdKEUdewJF2-oFzg&type=video&eventType=live&key=AIzaSyASqiJi-U60SZDZP2BQL71xJSElj99xUfU`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const data = await response.json()
        if (data.items.length > 0) {
          setIsLive(true)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    getYoutubeLiveStatus()
  },[])
  
  const GET_CURRENT_SEASON = gql`
  query currentSeason {
    seasonCollection (where: { current: true }) {
      items {
        seasonNumber,
        current,
        videosCollection {
          items {
            title,
            youtubeUrl
          }
        }
      }
    }
  }
  `

  const { loading, error, data } = useQuery(GET_CURRENT_SEASON, { fetchPolicy: 'cache-first' })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;



  // const seasons = data.seasonCollection.items
  console.log(`data is`, data)
  const currentSeason = data.seasonCollection.items[0]
  const seasonTitle = currentSeason.seasonNumber < 10 ? `SEASON.0${currentSeason.seasonNumber}` : `SEASON.${currentSeason.seasonNumber}`


  const handleMenuBtnClick = () => {
    setPageName(PAGES.MAIN)
    setShowMenu(true)
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
      <div className='flex-container'>
        <div className='row'>
          <motion.div 
            initial={{ y: '25px', opacity: 0}}
            animate={{ y: '0', opacity: 1 }}
            transition={{ duration: 1.5}}
            className='title-container'>
              <h1 data-text='KITTYHAUS'>KITTYHAUS</h1>
          </motion.div>
          <motion.div
            initial={{  opacity: 0, maxWidth: '0%'}}
            animate={{ opacity: 1, maxWidth: '100%' }}
            transition={{ duration: 1.8, delay: 1.3 }}
            className='title-container title-season'>
              <p data-text={seasonTitle}>{seasonTitle}</p>
          </motion.div>
        </div>
        <div className='row menu'>
          <Menu
            initialLoad={initialLoad}
            setInitialLoad={setInitialLoad}
            pageName={pageName}
            setPageName={setPageName}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <Page pageName={pageName} setPageName={setPageName} currentSeason={currentSeason}/>
        </div>
      </div>
      <motion.div
        initial={{ backgroundColor: initialLoad ? 'rgba(0, 0 , 0, 1)' : 'rgba(0, 0, 0, 0, 0'}}
        animate={{ backgroundColor: showMenu ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)' }}
        transition={{ delay:  initialLoad ? 3.75 : 0, duration: 2.5 }}
        className='overlay-bg'
      /> 
      { 
        !showMenu && 
        <button className='hamburger-btn' onClick={() => handleMenuBtnClick()}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      }
           <YouTube videoId={`HQNgOt2TtC8`} isLive={isLive} showMenu={showMenu}/>
    </>
  )
}
