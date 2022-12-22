import { Container, Grid } from '@mui/material'
import React from 'react'
import { ChapterList } from '../../components'
import styles from './index.module.scss'

const Main = () => {
	return (
		<Grid className={styles.main} container spacing={2}>
			<Grid item xs={4}>
				<ChapterList data={[]} loading={true} />
			</Grid>
			<Grid item xs={8}></Grid>
		</Grid>
	)
}

export default Main
