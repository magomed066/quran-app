import { ChapterVerse, Pagination } from './../../../types/common'
import { createAsyncThunk } from '@reduxjs/toolkit'
import service from '../../../api/service'
import { Chapter, QueryLanguage } from '../../../types/common'

interface GetChapterActionData {
	lang: QueryLanguage
}

interface GetVerserByChapterActionData {
	id: number
	lang: QueryLanguage
	perPage: number
	page: number | string
	reciterId: number
}

const getChaptersAction = createAsyncThunk<Chapter[], GetChapterActionData>(
	'chapters/getChapters',
	async ({ lang }) => {
		const data = await service.getChapters(lang)

		return data
	},
)

const getVersesByChapterAction = createAsyncThunk<
	{
		verses: ChapterVerse[]
		pagination: Pagination
		page: number | string
	},
	GetVerserByChapterActionData
>(
	'chapters/getVersesByChapter',
	async ({ id, lang, perPage, page, reciterId }, s) => {
		const data = await service.getVersesByChapter(
			id,
			lang,
			page,
			perPage,
			reciterId,
		)

		return { ...data, page }
	},
)

export const chapterActionCreators = {
	getChaptersAction,
	getVersesByChapterAction,
}
