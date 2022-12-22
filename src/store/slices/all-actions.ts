import { chapterActions } from './chapter/chapterSlice'
import { commonActions } from './common/commonSlice'

export const allActionCreators = {
	...chapterActions,
	...commonActions,
}
