import ReactPlayer from 'react-player/youtube'

interface YouTubeProps {
	embedId: string
}

const YouTube = ({ embedId }: YouTubeProps) => {
	return (
		<ReactPlayer
			id="vid-player"
			url={`https://www.youtube.com/watch?v=${embedId}`}
			volume={1}
			muted={true}
			playing={true}
			controls={false}
			style={{ 
				height: 'auto',
				minHeight: '100%',
				minWidth: '100%',
				maxWidth: '100%',
				position: 'fixed',
				pointerEvents: 'none',
				zIndex: '-1'
			}}
		/>
	)
}

export default YouTube;