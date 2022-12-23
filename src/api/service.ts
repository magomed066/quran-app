import { apiInstance } from '.'
import { Chapter, ChapterVerse, Pagination } from '../types/common'
import { IService } from '../types/service'

class Service implements IService {
	async getChapters(lang: string = 'en'): Promise<Chapter[]> {
		const { data } = await apiInstance.get(`chapters?language=${lang}`)

		return data.chapters
	}

	async getVersesByChapter(
		id: number,
		lang: string = 'en',
		page: string | number,
		perPage: number = 10,
	): Promise<{
		verses: ChapterVerse[]
		pagination: Pagination
	}> {
		const { data } = await apiInstance.get(`verses/by_chapter/${id}`, {
			params: {
				language: lang,
				words: true,
				per_page: 10,
				page,
				word_fields: 'text_uthmani, text_indopak, text_uhtimani_tajweed',
				audio: 7,
				tafsirs: '168',
			},
		})

		return data
	}
}

export default new Service()
