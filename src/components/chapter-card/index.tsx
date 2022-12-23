import { FC, forwardRef, useMemo } from 'react'
import { Chapter } from '../../types/common'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import styles from './index.module.scss'
import { IconButton } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import css from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
	chapter: Chapter
	isFavorite?: boolean
}

const ChapterCard: FC<Props> = ({ chapter, isFavorite }, _) => {
	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: true,
	})

	const navigate = useNavigate()
	const { pathname } = useLocation()
	const activeId = useMemo(() => pathname.split('/')[2], [pathname])

	return (
		<div
			ref={ref}
			className={css(
				styles['card'],
				{ [styles['active']]: inView },
				{ [styles['highlighted']]: +activeId === chapter.id },
			)}
			onClick={() => navigate(`/chapters/${chapter.id}`, { replace: true })}
		>
			<span className={styles['card__number']}>{chapter.id}</span>
			<div className={styles['card-content']}>
				<h3 className={styles['card-content__title']}>{chapter.name_simple}</h3>
				<h3 className={styles['card-content__sub']}>
					{chapter.translated_name.name}
				</h3>
				<h3 className={styles['card-content__info']}>
					{chapter.revelation_place}, {chapter.verses_count} Ayah
				</h3>
			</div>

			<IconButton className={styles['save']}>
				{isFavorite ? (
					<FavoriteIcon className={styles['favorite']} />
				) : (
					<FavoriteBorderIcon />
				)}
			</IconButton>
		</div>
	)
}

export default ChapterCard
