import { FC } from 'react'
import { List, ListItem, ListItemText } from '@mui/material'
import { Chapter } from '../../types/common'
import styles from './styles.module.scss'
import Empty from '../empty'
import LoadingSkeleton from '../skelelon'

interface Props {
	data: Chapter[]
	loading?: boolean
}

const ChapterList: FC<Props> = ({ data, loading }) => {
	if (loading) {
		return <LoadingSkeleton rows={5} width={360} />
	}

	return (
		<List sx={{ bgcolor: 'background.paper' }} className={styles.list}>
			{data.length ? (
				data.map((item) => (
					<ListItem className={styles['list-item']}>
						<div className={styles['list-item__counter']}>{item.id}</div>
						<ListItemText
							primary={item.name_simple}
							secondary={item.translated_name.name}
						/>
					</ListItem>
				))
			) : (
				<Empty />
			)}
		</List>
	)
}

export default ChapterList
