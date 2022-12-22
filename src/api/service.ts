import { apiInstance } from '.'
import { Chapter, ChapterVerse } from '../types/common'
import { IService } from '../types/service'

class Service implements IService {
	async getChapters(lang: string = 'en'): Promise<Chapter[]> {
		const { data } = await apiInstance.get(`chapters?language=${lang}`)

		return data.chapters
	}

	async getVersesByChapter(
		id: number,
		lang: string = 'en',
	): Promise<ChapterVerse[]> {
		const { data } = await apiInstance.get(`verses/by_chapter/${id}`, {
			params: {
				language: lang,
				words: true,
				word_fields: 'text_uthmani, text_indopak, text_uhtimani_tajweed',
				audio: 7,
			},
		})

		return data.verses
	}
}

export default new Service()
