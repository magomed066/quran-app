import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import { Main } from './pages'
import { Chapter } from './types/common'
import { Header } from './components'

const App = () => {
	const [data, setData] = useState<Chapter[]>([])
	useEffect(() => {
		fetch('https://api.quran.com/api/v4/chapters')
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				setData(res.chapters)
			})
	}, [])

	return (
		<BrowserRouter>
			<Box>
				<Header />
				<Routes>
					<Route path="/" element={<Main />} />
				</Routes>
			</Box>

			{/* <ChapterList data={data} /> */}
			{/* <Button variant="contained">Hello World</Button> */}
		</BrowserRouter>
	)
}

export default App
