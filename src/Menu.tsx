import { motion } from 'framer-motion'
import { MAIN_MENU, PAGES } from './constants'
import './Menu.css'

interface MenuProps {
	pageName: string,
	setPageName: (pageName: string) => void,
	showMenu: boolean,
	setShowMenu: (arg0: boolean) => void
}

export default function Menu({ pageName, setPageName, showMenu, setShowMenu }: MenuProps) {
	const renderMenuItems = () => {
		if (pageName !== PAGES.MAIN) {
		return (
			<motion.button
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 1.2 }}
				onClick={() => setPageName(PAGES.MAIN)}
				className='base-btn selected'
			>
				<p data-text={`< ${pageName}`}className='btn-text'>&lt; {pageName}</p>
			</motion.button>)
		}

		return MAIN_MENU.map((item, i) => {
			if (i === 0) {
				return (
				<motion.button
						key={item}
						className='base-btn menu-item-btn'
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.2 }}
						onClick={() => setShowMenu(false)}
					>
						<p data-text={item} className='btn-text'>{item}</p>
					</motion.button>
				)
			} else {
				return(
					<motion.button
						key={item}
						className='base-btn menu-item-btn'
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.2 }}
						onClick={() => setPageName(item)}
					>
						<p data-text={item} className='btn-text'>{item}</p>
					</motion.button>
				)
			}
		}

		)
	}

	if (showMenu) {	
		return(
			<>
			{ renderMenuItems() }
			</>
		)
	}
	
}