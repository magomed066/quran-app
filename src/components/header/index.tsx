import { MenuItem, Button, Menu } from '@mui/material'
import Logo from '../../assets/images/icons8-quran-64.png'
import { QueryLanguage } from '../../types/common'
import { useAppSelector } from '../../hooks/redux'
import useActions from '../../hooks/useActions'
import styles from './index.module.scss'
import React, { useState } from 'react'

const Header = () => {
	const { lang } = useAppSelector((store) => store.common)
	const { setLang } = useActions()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
		const target = e.target as HTMLLIElement
		setLang(target.textContent?.toLowerCase() as QueryLanguage)
		setAnchorEl(null)
		window.location.reload()
	}

	return (
		<div className={styles.header}>
			<div className={styles['header-logo']}>
				<img src={Logo} alt="logo" className={styles['header-logo__item']} />
			</div>

			<div className={styles['header-actions']}>
				<Button
					className={styles.language}
					id="basic-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					{lang}
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={handleClose}>Ru</MenuItem>
					<MenuItem onClick={handleClose}>En</MenuItem>
				</Menu>
			</div>
		</div>
	)
}

export default Header
