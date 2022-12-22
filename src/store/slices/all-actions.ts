import { chapterActionCreators } from './chapter/actions'
import { commonActions } from './common/commonSlice'

export const allActionCreators = {
	...chapterActionCreators,
	...commonActions,
}
