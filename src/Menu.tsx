import { motion } from 'framer-motion'
import { MAIN_MENU, PAGES } from './constants'
import './Menu.css'

interface MenuProps { 
	initialLoad: boolean,
	pageName: string,
	setPageName: (pageName: string) => void,
	showMenu: boolean,
	setShowMenu: (arg0: boolean) => void
}

export default function Menu({
	pageName,
	setPageName,
	showMenu,
	setShowMenu
	
}: MenuProps) {
	
	const onClickFn = (item: string) => {
		if (item === MAIN_MENU[0]) {
			setShowMenu(false)
		}
		setPageName(item)
	}

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

		return MAIN_MENU.map((item, i) =>
			<motion.button
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0, transition:{ duration: 0.4, delay: i*0.1 } }}
				key={item}
				className='base-btn menu-item-btn'
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 1.2 }}
				onClick={() => onClickFn(item)}
			>
				<p data-text={item} className='btn-text'>{item}</p>
			</motion.button>
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