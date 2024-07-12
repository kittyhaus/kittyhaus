import { useState } from 'react'
import { motion } from 'framer-motion'
import KittyProfile from './KittyProfile.tsx'
import './KittyProfiles.css'
import { Profile } from '../types.tsx'
import { useQuery, gql } from '@apollo/client';
 
const defaultKitty: Profile = {
    name: '',
    img: '',
		weight: 0,
		play: 0,
		cuddle: 0,
		eat: 0,
		sleep: 0
}
const GET_CURRENT_SEASON_KITTENS = gql`
query currentSeason {
	seasonCollection (limit: 1, where: { current: true } ) {
		items{
			kittensCollection {
				items {
					name,
					img,
					weight,
					play,
					cuddle,
					eat,
					sleep
				}
			}
		}
	}
}
`
function KittyProfiles() {
	const { loading, error, data } = useQuery(GET_CURRENT_SEASON_KITTENS, { fetchPolicy: 'cache-first' })
	const [ selectedKitty, setSelectedKitty ] = useState(defaultKitty)
	const [ featureImgUrl, setFeatureImgUrl ] = useState('')

	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

	const kittenProfiles = data.seasonCollection.items[0].kittensCollection.items

	const changeImgOnHover = ( url: string) => {
		if (selectedKitty && !url) {
			setFeatureImgUrl(selectedKitty.img)
			return
		}
		setFeatureImgUrl(url)
	}

	const renderKittensList = () => {
		const filteredKittenProfiles = selectedKitty.name ? kittenProfiles.filter((kittenProfile: Profile )=> kittenProfile === selectedKitty) : kittenProfiles
		return filteredKittenProfiles.map((profile: Profile) => (
			<KittyProfile
				profile={profile}
				profiles={kittenProfiles}
				setSelectedKitty={setSelectedKitty}
				hoverFn={changeImgOnHover}
				isSelected={profile === selectedKitty}
				clearSelectedKitty={clearSelectedKitty}
			/>
		))
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