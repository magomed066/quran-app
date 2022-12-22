import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QueryLanguage } from '../../../types/common'
import { CommonInitialState } from '../../../types/store'

const initialState: CommonInitialState = {
	lang: 'ru',
}

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLang(state, action: PayloadAction<QueryLanguage>) {
			state.lang = action.payload
		},
	},
	extraReducers: (builder) => {},
})

export const commonActions = {
	...commonSlice.actions,
}

export default commonSlice.reducer
