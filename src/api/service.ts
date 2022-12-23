import { apiInstance } from '.'
import { Chapter, ChapterVerse, Pagination } from '../types/common'
import { IService } from '../types/service'
import { Reciter } from '../types/store'

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
		reciterId: number,
	): Promise<{
		verses: ChapterVerse[]
		pagination: Pagination
	}> {
		const { data } = await apiInstance.get(`verses/by_chapter/${id}`, {
			params: {
				language: lang,
				words: true,
				per_page: perPage,
				page,
				word_fields: 'text_uthmani, text_indopak, text_uhtimani_tajweed',
				audio: reciterId,
				tafsirs: '168',
			},
		})

		return data
	}

	async getReciters(lang: string = 'en'): Promise<{ recitations: Reciter[] }> {
		const { data } = await apiInstance.get(
			`resources/recitations?language=${lang}`,
		)

		return data
	}
}

export default new Service()
