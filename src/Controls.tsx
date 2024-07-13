import { useState } from 'react'
import { motion } from 'framer-motion'
import { isMobileDevice } from './shared/sharedFunctions'
import settingsIcon from '/settings.svg'
import fullscreenIcon from '/fullscreen.svg'
import soundIcon from '/sound.svg'
import muteIcon from '/mute.svg'
import playIcon from '/play.svg'
import pauseIcon from '/pause.svg'
import youtubeIcon from '/youtube.svg'
import './Controls.css'

interface ControlsProps {
  muted: boolean,
  setMuted: (arg0: boolean) => void,
  playing: boolean,
  setPlaying: (arg0: boolean) => void,
  youtubeUrl: string
}

export default function Controls({
  muted,
  setMuted,
  playing,
  setPlaying,
  youtubeUrl
}: ControlsProps) {

  const [showControls, setShowControls] = useState(false)
  const isFullScreen = (): boolean => {
    return document.fullscreenElement !== null
  }
  const enterFullScreen = () => {
    if (isMobileDevice()) {
      const ytPlayer = document.getElementsByTagName('video')[0]
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
    <motion.div initial={{ maxHeight: '25px' }} animate={{ maxHeight: showControls ? '185px' : '25px'  }} className='controls-container'>
      <motion.button
        className='control-btn'
        onClick={() =>     setShowControls(!showControls)}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: showControls ? 90 : 0, opacity: 1}}
        title={`${showControls ? `Hide` : `Show`} controls`}
      >
        <img className='control-btn-img' src={settingsIcon} alt='controls'/>
      </motion.button>
      <button
        title={playing ? 'Pause' : 'Play'}
        className='control-btn'
        onClick={() => setPlaying(!playing)}
      >
        <img
          className='control-btn-img'
          src={playing ? pauseIcon : playIcon}
          alt={playing ? 'pause' : 'play'}
        />
      </button>
      <button
        title={muted ? 'Unmute' : 'Mute'}
        className='control-btn'
        onClick={() => setMuted(!muted) }
      >
        <img
          className='control-btn-img'
          src={muted ? muteIcon : soundIcon}
          alt={muted ? 'mute' : 'unnmute'}
        />
      </button>
      {
        !isMobileDevice() &&
        <button
          title='Fullscreen'
          className='control-btn'
          onClick={() => handleFullScreenBtnClick() }>
          <img
            className='control-btn-img'
            src={fullscreenIcon}
            alt='toggle fullscreen'
          />
        </button>
      }
      <button
        title='Watch on YouTube'
        className='control-btn'
        onClick={() => open(youtubeUrl, '_blank') }
      >
        <img
          className='control-btn-img'
          src={youtubeIcon}
          alt='watch on YouTube'
        />
      </button>
    </motion.div>
  )
}

