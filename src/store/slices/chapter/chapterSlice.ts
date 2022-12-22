import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChapterVerse } from '../../../types/common'
import { ChapterInitialState } from '../../../types/store'

import { chapterActionCreators } from './actions'

const { getChaptersAction, getVersesByChapterAction } = chapterActionCreators

const initialState: ChapterInitialState = {
	chapters: [],
	chapterVerses: [],
	status: 'idle',
	versesStatus: 'idle',
	autoPlayedAudioId: null,
}

const chaptersSlice = createSlice({
	name: 'chapters',
	initialState,
	reducers: {
		setAutoPlayedAudId(state, action: PayloadAction<number>) {
			state.autoPlayedAudioId = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getChaptersAction.pending, (state) => {
			state.status = 'pending'
		})

		builder.addCase(getChaptersAction.fulfilled, (state, { payload }) => {
			state.chapters = payload
			state.status = 'completed'
		})

		builder.addCase(getVersesByChapterAction.pending, (state) => {
			state.versesStatus = 'pending'
		})

		builder.addCase(
			getVersesByChapterAction.fulfilled,
			(state, action: PayloadAction<ChapterVerse[]>) => {
				state.chapterVerses = action.payload

				state.versesStatus = 'completed'
			},
		)
	},
})

export const chapterActions = {
	...chaptersSlice.actions,
	...chapterActionCreators,
}

export default chaptersSlice.reducer
