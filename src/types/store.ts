import { Chapter, ChapterVerse, QueryLanguage, Status } from './common'

export interface ChapterInitialState {
	chapters: Chapter[]
	chapterVerses: ChapterVerse[]
	status: Status
	versesStatus: Status
	loadMore: boolean
	autoPlayedAudioId: number | null
	pagination: {
		perPage: 10
		totalRecords: number | null
		totalPages: number | null
		nextPage: number | null
	}
}

export interface CommonInitialState {
	lang: QueryLanguage
	reciters: Reciter[]
	selectedReciterId: number
}

export interface Reciter {
	id: number
	reciter_name: string
	style: string
	translated_name: { name: string; language_name: string }
}
