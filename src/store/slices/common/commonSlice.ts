import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QueryLanguage } from '../../../types/common'
import { CommonInitialState } from '../../../types/store'

const language = JSON.parse(localStorage.getItem('lang') as QueryLanguage)

const initialState: CommonInitialState = {
	lang: language || 'ru',
}

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLang(state, action: PayloadAction<QueryLanguage>) {
			localStorage.clear()
			state.lang = action.payload
			localStorage.setItem('lang', JSON.stringify(action.payload))
		},
	},
	extraReducers: (builder) => {},
})

export const commonActions = {
	...commonSlice.actions,
}

export default commonSlice.reducer
