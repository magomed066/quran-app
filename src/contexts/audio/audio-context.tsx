import { createContext, FC, ReactNode, useState } from 'react'
import { IAudio } from '../../types/common'

interface InitialContext {
	audios: IAudio[]
	setAudios: React.Dispatch<React.SetStateAction<IAudio[]>>
	pausedAudioId: number
	setPausedAudioId: React.Dispatch<React.SetStateAction<number>>
}

interface Props {
	children: ReactNode
}

const initialContext: InitialContext = {
	audios: [],
	pausedAudioId: 0,
	setAudios: () => {},
	setPausedAudioId: () => {},
}

export const AudioContext = createContext(initialContext)

export const AudioProvider: FC<Props> = ({ children }) => {
	const [audios, setAudios] = useState<IAudio[]>([])
	const [pausedAudioId, setPausedAudioId] = useState<number>(0)

	const value = {
		audios,
		setAudios,
		pausedAudioId,
		setPausedAudioId,
	}

	return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
