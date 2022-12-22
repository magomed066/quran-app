import { FC, Fragment } from 'react'
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material'
import { Chapter } from '../../types/common'
import styles from './styles.module.scss'
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
		<List
			sx={{ bgcolor: 'background.paper', padding: '0' }}
			className={styles.list}
		>
			{data.map((item) => (
				<Fragment key={item.id}>
					<ListItem
						className={styles['list-item']}
						style={{
							display: 'flex',
							alignItems: 'flex-start',
							gap: 15,
						}}
					>
						<div className={styles['list-item__counter']}>{item.id}</div>
						<ListItemText
							style={{ marginTop: 'auto' }}
							primary={item.name_simple}
							secondary={
								<div className={styles['list-item__info']}>
									<span>{item.translated_name.name}</span>
									<span> {item.revelation_place}</span>
								</div>
							}
						/>
						<Typography color="GrayText">
							Versus: {item.verses_count}
						</Typography>
					</ListItem>
					<Divider />
				</Fragment>
			))}
		</List>
	)
}

export default ChapterList
