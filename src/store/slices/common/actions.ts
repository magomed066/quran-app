import { createAsyncThunk } from '@reduxjs/toolkit'
import service from '../../../api/service'
import { QueryLanguage } from '../../../types/common'
import { Reciter } from '../../../types/store'

interface GetChapterActionData {
	lang: QueryLanguage
}

const getRecitersAction = createAsyncThunk<Reciter[], GetChapterActionData>(
	'common/getReciters',
	async ({ lang }) => {
		const data = await service.getReciters(lang)

		return data.recitations
	},
)

export const commonAsyncActions = {
	getRecitersAction,
}
