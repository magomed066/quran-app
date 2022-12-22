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
			},
		})

		return data.verses
	}
}

export default new Service()
