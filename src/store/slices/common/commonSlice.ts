import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QueryLanguage } from '../../../types/common'
import { CommonInitialState } from '../../../types/store'

import { commonAsyncActions } from './actions'

const { getRecitersAction } = commonAsyncActions

const language = JSON.parse(localStorage.getItem('lang') as QueryLanguage)
const reciter = JSON.parse(localStorage.getItem('reciter') as QueryLanguage)

const initialState: CommonInitialState = {
	lang: language || 'ru',
	reciters: [],
	selectedReciterId: reciter ? reciter : 7,
}

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLang(state, action: PayloadAction<QueryLanguage>) {
			state.lang = action.payload
			localStorage.setItem('lang', JSON.stringify(action.payload))
		},
		selectReciter(state, action: PayloadAction<number>) {
			state.selectedReciterId = action.payload
			localStorage.setItem('reciter', JSON.stringify(action.payload))
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getRecitersAction.fulfilled, (state, { payload }) => {
			state.reciters = payload
		})
	},
})

export const commonActions = {
	...commonSlice.actions,
	...commonAsyncActions,
}

export default commonSlice.reducer
