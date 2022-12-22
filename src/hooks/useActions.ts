import { bindActionCreators } from '@reduxjs/toolkit'
import { allActionCreators } from '../store/slices/all-actions'
import { useAppDispatch } from './redux'

const useActions = () => {
	const dispatch = useAppDispatch()
	return bindActionCreators(allActionCreators, dispatch)
}

export default useActions
