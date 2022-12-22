import { Chapter } from './common'

export interface IService {
	getChapters(lang?: string): Promise<Chapter[]>
}
