import { Profile } from '../types.tsx'
import './KittyProfile.css'
import { motion } from 'framer-motion'
import { STATS } from '../constants.tsx'
interface KittyProfileProps {
	profile: Profile
	hoverFn: (id: string)=> void
	clickFn: (profile: Profile)=> void
	isSelected: boolean
}

function KittyProfile({ profile, hoverFn, clickFn, isSelected }: KittyProfileProps) {
	const isSelectedClass = isSelected ? `selected` : ``

	const generateStats = () => {
		const generateStatValueIcons = (value: number) => {
			let iconList = ''
			for (let i=1; i <= 5; i++) {
				if (i> value) {
					iconList += '☆'
				} else {
					iconList += '★'
				}
				console.log(iconList)
			}
			return iconList
		}

		if (isSelected) {
			return Object.entries(profile.stats).map((k) => {
				const key = k[0]
				const value = k[1]
				return (
					<div className='profile-stats'>
						{STATS[key as keyof object]}
						< br/>
						{ key === 'weight' ? `${Math.floor(value/16)}lbs ${value%16}oz` : generateStatValueIcons(value)}
						< br/>
					</div>
				)
			})
		}
	}

	return(
		<>
			<motion.button
				onMouseOver={() => hoverFn(profile.img)}
				onMouseLeave={() => hoverFn('')}
				onClick={() => clickFn(profile)}
				className={`profile-btn ${isSelectedClass}`}
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 1.2 }}
			>
				<p  data-text={profile.name} className='profile-name'>{ profile.name }</p>
			</motion.button>
			<div className="profile-stats-container">
				{ generateStats() }
			</div>
		</>
	)
}

export default KittyProfile