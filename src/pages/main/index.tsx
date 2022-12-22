import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { ChapterList } from '../../components'
import { useAppSelector } from '../../hooks/redux'
import useActions from '../../hooks/useActions'
import styles from './index.module.scss'

const Main = () => {
	const { lang } = useAppSelector((store) => store.common)
	const { status, chapters } = useAppSelector((store) => store.chapters)
	const { getChaptersAction, getVersesByChapterAction } = useActions()

	useEffect(() => {
		getChaptersAction({ lang })
	}, [])

	useEffect(() => {
		if (chapters.length) {
			getVersesByChapterAction({
				id: 1,
				lang,
			})
		}
	}, [chapters])

	return (
		<Grid className={styles.main} container spacing={2}>
			<Grid item xs={4}>
				<ChapterList
					data={chapters}
					loading={status === 'pending' ? true : false}
				/>
			</Grid>
			<Grid item xs={8}></Grid>
		</Grid>
	)
}

export default Main
