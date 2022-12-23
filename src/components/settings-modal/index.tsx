import {
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ModalContext } from '../../contexts/modal/modal'
import styles from './index.module.scss'
import ReactDOM from 'react-dom'
import CloseIcon from '@mui/icons-material/Close'
import { useAppSelector } from '../../hooks/redux'
import useActions from '../../hooks/useActions'

const ModalComponent = () => {
	const { open, close } = useContext(ModalContext)
	const { reciters, selectedReciterId } = useAppSelector(
		(store) => store.common,
	)

	const { selectReciter } = useActions()

	const handleChange = (event: SelectChangeEvent) => {
		selectReciter(+event.target.value)
	}

	return (
		<Modal
			open={open}
			onClose={close}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className={styles['modal']}>
				<div className={styles['modal-header']}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Settings
					</Typography>
					<IconButton onClick={close}>
						<CloseIcon />
					</IconButton>
				</div>

				<div className={styles.body}>
					<FormControl className={styles.select}>
						<InputLabel id="demo-simple-select-helper-label">
							Reciter
						</InputLabel>
						<Select
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper"
							value={String(selectedReciterId)}
							label="Reciter"
							onChange={handleChange}
						>
							{reciters.map((r) => (
								<MenuItem key={r.id} value={r.id}>
									{r.translated_name.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</Box>
		</Modal>
	)
}

const ModalSettings = () => {
	const el = document.getElementById('settings') as HTMLDivElement
	return ReactDOM.createPortal(<ModalComponent />, el)
}

export default ModalSettings
