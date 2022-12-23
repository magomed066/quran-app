import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import { ChapterVerse } from '../../types/common'
import styles from './index.module.scss'
import css from 'classnames'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { IconButton } from '@mui/material'
import useAudio from '../../hooks/audio'

interface Props {
	verse: ChapterVerse
}

const VerseCard: FC<Props> = ({ verse }) => {
	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: true,
	})

	const { playing, playVerse } = useAudio({
		url: verse.audio.url,
		id: verse.id,
	})

	return (
		<div
			ref={ref}
			className={css(styles['verse'], { [styles['active']]: inView })}
		>
			<div className={styles['header']}>
				<div className={styles['header__number']}>{verse.verse_key}</div>
				<div className={styles['header__text']}>
					{verse.words.map((w) => ' ' + w.text)}
				</div>
			</div>

			<div className={styles['verse-description']}>
				<div className={styles['verse-tafseer']}>
					See Tafseer
					<ArrowForwardIcon />
				</div>
				{verse.words.map((w, index) => (
					<span
						key={w.translation.text + w.id}
						className={styles['verse-description__text']}
					>
						{index === verse.words.length - 1 ? '.' : ' ' + w.translation.text}
					</span>
				))}
			</div>

			<div className={styles['verse-footer']}>
				<IconButton onClick={playVerse}>
					{playing ? (
						<PauseIcon className={styles['icon']} />
					) : (
						<PlayArrowIcon className={styles['icon']} />
					)}
				</IconButton>
			</div>
		</div>
	)
}

export default VerseCard
