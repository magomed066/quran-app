import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChapterVerse, Pagination } from '../../../types/common'
import { ChapterInitialState } from '../../../types/store'

import { chapterActionCreators } from './actions'

const { getChaptersAction, getVersesByChapterAction } = chapterActionCreators

const initialState: ChapterInitialState = {
	chapters: [],
	chapterVerses: [],
	status: 'idle',
	versesStatus: 'idle',
	loadMore: false,
	autoPlayedAudioId: null,
	pagination: {
		perPage: 10,
		totalPages: null,
		totalRecords: null,
		nextPage: null,
	},
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
			if (state.chapterVerses.length > 1) {
				state.loadMore = true
			} else {
				state.versesStatus = 'pending'
			}
		})

		builder.addCase(
			getVersesByChapterAction.fulfilled,
			(
				state,
				action: PayloadAction<{
					verses: ChapterVerse[]
					pagination: Pagination
					page: number | string
				}>,
			) => {
				const { verses, pagination, page } = action.payload

				state.chapterVerses =
					Number(page) === 1 ? verses : [...state.chapterVerses, ...verses]

				state.pagination = {
					...state.pagination,
					totalRecords: pagination.total_records,
					totalPages: pagination.total_pages,
					nextPage: pagination.next_page,
				}

				state.versesStatus = 'completed'
				state.loadMore = false
			},
		)
	},
})

export const chapterActions = {
	...chaptersSlice.actions,
	...chapterActionCreators,
}

export default chaptersSlice.reducer
