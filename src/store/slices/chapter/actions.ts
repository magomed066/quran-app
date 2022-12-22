import { ChapterVerse } from './../../../types/common'
import { createAsyncThunk } from '@reduxjs/toolkit'
import service from '../../../api/service'
import { Chapter, QueryLanguage } from '../../../types/common'

interface GetChapterActionData {
	lang: QueryLanguage
}

interface GetVerserByChapterActionData {
	id: number
	lang: QueryLanguage
}

const getChaptersAction = createAsyncThunk<Chapter[], GetChapterActionData>(
	'chapters/getChapters',
	async ({ lang }) => {
		const data = await service.getChapters(lang)

		return data
	},
)

const getVersesByChapterAction = createAsyncThunk<
	ChapterVerse[],
	GetVerserByChapterActionData
>('chapters/getVersesByChapter', async ({ id, lang }) => {
	const data = await service.getVersesByChapter(id, lang)

	return data
})

export const chapterActionCreators = {
	getChaptersAction,
	getVersesByChapterAction,
}
