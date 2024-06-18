
import './YouTube.css'

interface YouTubeProps {
	embedId: string
}

const YouTube = (props: YouTubeProps) => {
	const { embedId } = props

	return (
		<iframe
			className='youtube-iframe'
			src={`https://www.youtube.com/embed/${embedId}?autoplay=1&controls=0&mute=1`}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
			title="Embedded youtube"
		/>
	)
}
  
export default YouTube;