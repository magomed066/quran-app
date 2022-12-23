export interface Chapter {
	bismillah_pre: boolean
	id: number
	name_arabic: string
	name_complex: string
	name_simple: string
	pages: number[]
	revelation_order: number
	revelation_place: string
	translated_name: { language_name: string; name: string }
	verses_count: number
}

export interface ChapterVerse {
	id: number
	verse_number: number
	verse_key: string
	hizb_number: number
	rub_el_hizb_number: number
	ruku_number: number
	manzil_number: number
	sajdah_number: number
	page_number: number
	juz_number: number
	words: Word[]
	audio: {
		url: string
		segments: number[]
	}
}

export interface Word {
	id: number
	position: number
	audio_url: string
	char_type_name: string
	code_v1: string
	page_number: number
	line_number: string
	text: string
	translation: {
		text: string
		language_name: string
	}
	transliteration: {
		text: string
		language_name: string
	}
}

export interface IAudio {
	id: number
	url: string
	audio: HTMLAudioElement
}

export interface Pagination {
	current_page: number
	next_page: number
	per_page: number
	total_pages: number
	total_records: number
}

export type Status = 'idle' | 'pending' | 'completed' | 'error'

export type QueryLanguage = 'ru' | 'en'
