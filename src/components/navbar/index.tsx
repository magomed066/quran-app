import { NavLink, useLocation } from 'react-router-dom'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SettingsIcon from '@mui/icons-material/Settings'
import styles from './index.module.scss'
import { IconButton } from '@mui/material'
import { FC, useContext } from 'react'
import { ModalContext } from '../../contexts/modal/modal'
import ClearAllIcon from '@mui/icons-material/ClearAll'

interface Props {
	setActiveChapters: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: FC<Props> = ({ setActiveChapters }) => {
	const { pathname } = useLocation()
	const { show } = useContext(ModalContext)

	return (
		<div className={styles.navbar}>
			<NavLink
				className={() =>
					pathname.includes('/chapters')
						? `${styles.link} ${styles.activeLink}`
						: styles.link
				}
				to="/chapters/1?page=1"
			>
				<ImportContactsIcon className={styles.icon} />
			</NavLink>

			<NavLink
				to="/savedAyahs"
				className={({ isActive }) =>
					isActive ? `${styles.link} ${styles.activeLink}` : styles.link
				}
			>
				<FavoriteIcon className={styles.icon} />
			</NavLink>
			<IconButton onClick={() => setActiveChapters(true)}>
				<ClearAllIcon className={styles.icon} />
			</IconButton>

			<IconButton onClick={show} className={styles['settings-icon']}>
				<SettingsIcon />
			</IconButton>
		</div>
	)
}

export default Navbar
