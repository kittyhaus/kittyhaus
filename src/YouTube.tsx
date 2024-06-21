import ReactPlayer from 'react-player/youtube'

interface YouTubeProps {
	embedId: string
}

const YouTube = ({ embedId }: YouTubeProps) => {
	return (
		<ReactPlayer
			url={`https://www.youtube.com/watch?v=${embedId}`}
			volume={1}
			muted={true}
			playing={true}
			controls={false}
			style={{ 
				width: 'auto',
				height: 'auto',
				minHeight: '100%',
				minWidth: '100%',
				position: 'fixed',
				pointerEvents: 'none' 
			}}
		/>
	)
}

export default YouTube;