import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { ChapterList, Verse } from '../../components'
import { useAppSelector } from '../../hooks/redux'
import useActions from '../../hooks/useActions'
import styles from './index.module.scss'
import LoadingSkeleton from '../../components/skelelon'
import { IAudio } from '../../types/common'

const Main = () => {
	const [audios, setAudios] = useState<IAudio[]>([])
	const [pausedAudioId, setPausedAudioId] = useState<number | null>(null)
	const { lang } = useAppSelector((store) => store.common)
	const { status, chapters, chapterVerses, versesStatus } = useAppSelector(
		(store) => store.chapters,
	)
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
			<Grid item xs={2.5}>
				<ChapterList
					data={chapters}
					loading={status === 'pending' ? true : false}
				/>
			</Grid>
			<Grid item xs={9.5} className={styles['main-content']}>
				{versesStatus === 'pending' ? (
					<LoadingSkeleton rows={6} />
				) : (
					chapterVerses.map((verse) => (
						<Verse
							audios={audios}
							setAudios={setAudios}
							key={verse.id}
							pausedAudioId={pausedAudioId}
							setPausedAudioId={setPausedAudioId}
							verse={verse}
						/>
					))
				)}
			</Grid>
		</Grid>
	)
}

export default Main
