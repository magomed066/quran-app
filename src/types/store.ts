import { Chapter, ChapterVerse, QueryLanguage, Status } from './common'

export interface ChapterInitialState {
	chapters: Chapter[]
	chapterVerses: ChapterVerse[]
	status: Status
	versesStatus: Status
	autoPlayedAudioId: number | null
}

export interface CommonInitialState {
	lang: QueryLanguage
}
