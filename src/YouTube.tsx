import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Controls from './Controls'

interface YouTubeProps {
	videoId: string,
	isLive: boolean,
	showMenu: boolean
}

const YouTube = ({ videoId, isLive, showMenu}: YouTubeProps) => {
	const [muted, setMuted] = useState(true)
	const [playing, setPlaying] = useState(true)

	console.log('Youtube Component', 'is Live?', isLive, 'videoId:', videoId)
	const youtubeUrl = isLive ? `https://www.youtube.com/embed/live_stream?channel=UCPov_QpFdKEUdewJF2-oFzg` : `https://www.youtube.com/embed/${videoId}`

	console.log('what is the url', youtubeUrl)
	return (
		<>
			{
				!showMenu &&
				<Controls 
					muted={muted}
					setMuted={setMuted}
					playing={playing}
					setPlaying={setPlaying}
					youtubeUrl={`${youtubeUrl}?autoplay=1`}
				/>
			}
			<ReactPlayer
				id="vid-player"
				url={youtubeUrl}
				volume={1}
				controls={false}
				muted={muted}
				playing={playing}
				style={{ 
					height: 'auto',
					minHeight: '100%',
					minWidth: '100%',
					maxWidth: '100%',
					position: 'fixed',
					pointerEvents: 'none',
					zIndex: '-1'
				}}
				config={{
					playerVars:{
						playsinline: 0
					}
				}}
			/>
		</>
	)
}

export default YouTube;