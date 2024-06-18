import { useState } from 'react'
import { motion } from 'framer-motion'
import data from '../data.tsx'
import KittyProfile from './KittyProfile.tsx'
import './KittyProfiles.css'
import { Profile, Season } from '../types.tsx'
 
const currentSeason: Season = data.seasons.find(season => season.current) || data.seasons[0]
const defaultKitty: Profile = {
    id: null,
    name: '',
    img: '',
		stats: {
			weight: 0,
			play: 0,
			cuddle: 0,
			eat: 0,
			sleep: 0
		}
}

function KittyProfiles() {
	const [ selectedKitty, setSelectedKitty ] = useState(defaultKitty)
	const [ featureImgUrl, setFeatureImgUrl ] = useState('')

	const changeImgOnHover = ( url: string) => {
		if (selectedKitty && !url) {
			setFeatureImgUrl(selectedKitty.img)
			return
		}
		setFeatureImgUrl(url)
	}

	const renderKittensList = () => {
		if (selectedKitty.id !== null) {
			return <KittyProfile profile={selectedKitty} clickFn={clearSelectedKitty} hoverFn={changeImgOnHover} isSelected={true} />
		} else {
		return currentSeason.profiles.map((profile: Profile) => (
			<KittyProfile profile={profile} clickFn={setSelectedKitty} hoverFn={changeImgOnHover} isSelected={false}/>
		))
		}
	}

	const clearSelectedKitty = () => {
		setSelectedKitty(defaultKitty)
		setFeatureImgUrl('')
	}

	return(
		<>
			<div className='kitty-profiles-subtitle-container'>STARRING</div>
			<div className='kitty-profile-names-container'>
				<div className="kitty-profiles-img-container">
					{ featureImgUrl && <motion.img animate={{ opacity: 100 }} className="kitty-profile-img" src={featureImgUrl} /> }
				</div>
				{ renderKittensList() }
			</div>
		</>
	)
}

export default KittyProfiles