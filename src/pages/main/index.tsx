import { Box } from '@mui/material'
import { Header, ModalSettings, Navbar } from '../../components'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Chapters from '../chapters'
import styles from './index.module.scss'
import { ModalProvider } from '../../contexts/modal/modal'
import { useState } from 'react'

const Main = () => {
	const [activeChapters, setActiveChapters] = useState(true)
	return (
		<BrowserRouter>
			<Box>
				<ModalProvider>
					<Header />
					<div className="container">
						<Navbar setActiveChapters={setActiveChapters} />
						<div className={styles['main-content']}>
							<Routes>
								<Route
									path="/chapters/:id"
									element={
										<Chapters
											setActiveChapters={setActiveChapters}
											activeChapters={activeChapters}
										/>
									}
								/>
								<Route path="/savedAyahs" element={<h2>Saved Ayahs</h2>} />
								<Route
									path="*"
									element={<Navigate to={'/chapters/1'} replace={true} />}
								/>
							</Routes>
						</div>

						<ModalSettings />
					</div>
				</ModalProvider>
			</Box>
		</BrowserRouter>
	)
}

export default Main
