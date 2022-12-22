import { Box, Typography } from '@mui/material'
import styles from './index.module.scss'
import FolderIcon from '@mui/icons-material/Folder'

const Empty = () => {
	return (
		<Box className={styles['box']}>
			<FolderIcon className={styles['empty']} />
			<Typography variant="h5" component="h5">
				No data
			</Typography>
		</Box>
	)
}

export default Empty
