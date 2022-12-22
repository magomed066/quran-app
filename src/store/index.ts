import { combineReducers, configureStore } from '@reduxjs/toolkit'
import * as reducers from './slices'

const rootReducer = combineReducers(reducers)

export const store = configureStore({
	reducer: rootReducer,
	devTools: import.meta.env.MODE === 'production' ? false : true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
