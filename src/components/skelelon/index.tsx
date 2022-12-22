import { FC } from 'react'
import { Box, Skeleton } from '@mui/material'

interface Props {
	rows?: number
	width?: number
}

const LoadingSkeleton: FC<Props> = ({ rows = 3, width = 300 }) => {
	let rowsCount: JSX.Element[] = []

	for (let i = 0; i < rows; i++) {
		rowsCount.push(<Skeleton height={35} animation="wave" />)
	}

	return <Box style={{ padding: '0 10px', width }}>{rowsCount}</Box>
}

export default LoadingSkeleton
