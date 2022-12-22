import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { Paper, styled, IconButton } from '@mui/material'
import { ChapterVerse, IAudio } from '../../types/common'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import styles from './index.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { AUDIOS_URL } from '../../api'
import useActions from '../../hooks/useActions'
import { useAppSelector } from '../../hooks/redux'

interface Props {
	verse: ChapterVerse
	audios: IAudio[]
	setAudios: Dispatch<SetStateAction<any>>
	setPausedAudioId: (id: number) => void
	pausedAudioId: number | null
}

const Verse: FC<Props> = ({
	verse,
	setAudios,
	audios,
	setPausedAudioId,
	pausedAudioId,
}) => {
	const [playing, setPlaying] = useState<boolean>(false)
	const [ended, setEnded] = useState<boolean>(false)
	const audio = useMemo(
		() => new Audio(AUDIOS_URL + verse.audio.url),
		[verse.audio.url],
	)

	const { setAutoPlayedAudId } = useActions()
	const { autoPlayedAudioId } = useAppSelector((store) => store.chapters)

	useEffect(() => {
		if (pausedAudioId === verse.id) setPlaying(false)
	}, [pausedAudioId, verse.id])

	useEffect(() => {
		if (autoPlayedAudioId === verse.id) playVerse()
	}, [autoPlayedAudioId])

	useEffect(() => {
		setAudios((prev: any) => [...prev, { id: verse.id, audio }])

		const handleEnded = () => {
			setPlaying(false)
			setEnded(true)
		}

		audio.addEventListener('ended', handleEnded)

		return () => {
			audio.pause()
			audio.removeEventListener('ended', handleEnded)
		}
	}, [audio, verse.id, setAudios])

	const playVerse = () => {
		if (playing) {
			setPlaying(false)
			return audio.pause()
		}

		audios.forEach(({ id, audio }) => {
			if (!audio.paused) {
				audio.pause()
				setPausedAudioId(id)
			}
		})
		setPlaying(true)
		audio.play()
	}

	const playNext = () => {
		const idx = audios.findIndex((audio) => audio.id === verse.id)
		const nextAudio = idx + 1 === audios.length ? null : audios[idx + 1]
		if (!nextAudio) return
		setAutoPlayedAudId(nextAudio.id)
	}

	useEffect(() => {
		if (ended) {
			playNext()
		}
	}, [ended])

	console.log('autoPlayedAudioId', autoPlayedAudioId)

	return (
		<Item elevation={2} className={styles.card}>
			<div className={styles['card-header']}>
				<div className={styles['verse-number']}>{verse.verse_key}</div>
				<div className={styles['arabic-text']}>
					{verse.words.map((w) => ' ' + w.text)}
				</div>
			</div>

			<div className={styles['verse-description']}>
				<div className={styles['verse-tafseer']}>
					See Tafseer
					<ArrowForwardIcon />
				</div>
				{verse.words.map((w, index) => (
					<span className={styles['verse-description__text']}>
						{index === verse.words.length - 1 ? '.' : ' ' + w.translation.text}
					</span>
				))}
			</div>

			<div className={styles['verse-footer']}>
				<IconButton onClick={playVerse}>
					{playing ? <PauseIcon /> : <PlayArrowIcon />}
				</IconButton>
			</div>
		</Item>
	)
}

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	color: theme.palette.text.secondary,
	padding: '20px',
	lineHeight: '20px',
	':not(:last-child)': {
		marginBottom: '20px',
	},
}))

export default Verse
