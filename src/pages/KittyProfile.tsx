import { Profile } from '../types.tsx'
import './KittyProfile.css'
import { motion } from 'framer-motion'
interface KittyProfileProps {
	profile: Profile
	hoverFn: (id: string) => void
	setSelectedKitty: (profile: Profile) => void
	clearSelectedKitty: () => void
	isSelected: boolean
	profiles: Profile[]
}

function KittyProfile({ profile, hoverFn, setSelectedKitty, clearSelectedKitty, isSelected, profiles }: KittyProfileProps) {
	const index = profiles.findIndex((kittyProfile: Profile) => kittyProfile === profile)
	const isSelectedClass = isSelected ? `selected` : ``

	const generateStats = () => {
		const generateStatValueIcons = (value: number) => {
			let stars = []
			for (let i = 1; i <= 5; i++) {
				if (i > value) {
					stars.push(<i className='nes-icon is-small star is-empty' />)
				} else {
					stars.push(<i className='nes-icon is-small star' />)
				}
			}
			return (
				stars
			)
		}

		if (isSelected) {
			const weightPounds = Math.floor(profile.weight / 16)
			const weightOunces = profile.weight % 16
			return (
				<>
					<div className='profile-stats'>
						Weight
						<br />
						{weightPounds}<span className='weight-unit-text'>{weightPounds > 1 ? `lbs ` : 'lb '}</span>
						{weightOunces}<span className='weight-unit-text'>oz</span>
						<br />
					</div>
					<div className='profile-stats'>
						Play
						<br />
						{generateStatValueIcons(profile.play)}
						<br />
					</div>
					<div className='profile-stats'>
						Eat
						<br />
						{generateStatValueIcons(profile.eat)}
						<br />
					</div>
					<div className='profile-stats'>
						Sleep
						<br />
						{generateStatValueIcons(profile.sleep)}
						<br />
					</div>
					<div className='profile-stats'>
						Cuddle
						<br />
						{generateStatValueIcons(profile.cuddle)}
						<br />
					</div>
				</>
			)
		}
	}

	const seePrevProfile = (index: number) => {
		if (index === 0) {
			setSelectedKitty(profiles[profiles.length - 1])
			return
		}
		setSelectedKitty(profiles[index - 1])
	}

	const seeNextProfile = (index: number) => {
		if (index === profiles.length - 1) {
			setSelectedKitty(profiles[0])
			return
		}
		setSelectedKitty(profiles[index + 1])
	}

	return (
		<>
			<div className='profile-name-container'>
				{
					isSelected &&
					<motion.button
						onClick={() => seePrevProfile(index)}
						className='profile-btn prev-btn'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.2 }}
					>
						<p data-text='◀' className='profile-text'>◀</p>
					</motion.button>
				}
				<motion.button
					onMouseOver={() => hoverFn(profile.img)}
					onMouseLeave={() => hoverFn('')}
					onClick={isSelected ? () => clearSelectedKitty() : () => setSelectedKitty(profile)}
					className={`profile-btn ${isSelectedClass}`}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 1.2 }}
				>
					<p data-text={profile.name} className='profile-text'>{profile.name}</p>
				</motion.button>
				{
					isSelected &&
					<motion.button
						onClick={() => seeNextProfile(index)}
						className='profile-btn next-btn'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.2 }}
					>
						<p data-text='▶' className='profile-text'>▶</p>
					</motion.button>
				}
			</div>
			{
				isSelected && 
				<div className='profile-stats-container'>
					{generateStats()}
				</div>
			}
		</>
	)
}

export default KittyProfile