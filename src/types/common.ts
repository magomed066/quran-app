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
