import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { ChapterCard, VerseCard } from '../../components'
import LoadingSkeleton from '../../components/skelelon'
import { useAppSelector } from '../../hooks/redux'
import useActions from '../../hooks/useActions'
import styles from './index.module.scss'
import { useParams, useSearchParams } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { AudioProvider } from '../../contexts/audio/audio-context'

const Chapters = () => {
	const { lang, selectedReciterId } = useAppSelector((store) => store.common)
	const {
		chapters,
		status,
		pagination,
		versesStatus,
		chapterVerses,
		loadMore,
	} = useAppSelector((store) => store.chapters)
	const { getChaptersAction } = useActions()
	const { id } = useParams()
	let [searchParams, setSearchParams] = useSearchParams()
	const page = searchParams.get('page') || 1

	const { getVersesByChapterAction, getRecitersAction } = useActions()

	useEffect(() => {
		getChaptersAction({ lang })
		getRecitersAction({ lang })
	}, [])

	useEffect(() => {
		if (status === 'completed') {
			getVersesByChapterAction({
				id: Number(id),
				lang,
				perPage: pagination.perPage,
				page: page ? page : 1,
				reciterId: selectedReciterId,
			})
		}
	}, [status, id, page, selectedReciterId])

	return (
		<AudioProvider>
			<div className={styles.chapters}>
				<div className={styles['chapters-content']}>
					<Grid container gap={6}>
						<Grid item xs={3}>
							<div className={styles['chapters-list']}>
								{status === 'pending' ? (
									<LoadingSkeleton width={250} rows={6} />
								) : (
									chapters.map((ch) => <ChapterCard key={ch.id} chapter={ch} />)
								)}
							</div>
						</Grid>
						<Grid item xs={8.5}>
							<div className={styles['verses-list']}>
								{versesStatus === 'pending' ? (
									<LoadingSkeleton rows={6} />
								) : (
									chapterVerses.map((v) => <VerseCard key={v.id} verse={v} />)
								)}

								{pagination.nextPage ? (
									<LoadingButton
										size="small"
										color="primary"
										className={styles['load-more']}
										//@ts-ignore
										onClick={() => setSearchParams({ page: +page + 1 })}
										loading={loadMore}
										startIcon={<RestartAltIcon />}
										loadingPosition="start"
									>
										Load More
									</LoadingButton>
								) : null}
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</AudioProvider>
	)
}

export default Chapters
