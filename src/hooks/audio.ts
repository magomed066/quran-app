import { useContext, useEffect, useMemo, useState } from 'react'
import { AUDIOS_URL } from '../api'
import { AudioContext } from '../contexts/audio/audio-context'
import { useAppSelector } from './redux'
import useActions from './useActions'

interface Props {
	url: string
	id: number
}

const useAudio = (props: Props) => {
	const { url, id } = props

	const { setAudios, audios, setPausedAudioId, pausedAudioId } =
		useContext(AudioContext)

	const { autoPlayedAudioId } = useAppSelector((store) => store.chapters)
	const { setAutoPlayedAudId } = useActions()

	const [playing, setPlaying] = useState(false)
	const [ended, setEnded] = useState(false)

	const audio = useMemo(() => new Audio(AUDIOS_URL + url), [url])

	useEffect(() => {
		if (pausedAudioId === id) setPlaying(false)
	}, [pausedAudioId, id])

	useEffect(() => {
		if (autoPlayedAudioId === id) playVerse()
	}, [autoPlayedAudioId])

	useEffect(() => {
		setAudios((prev) => [...prev, { id, audio }])

		audio.addEventListener('ended', () => {
			setPlaying(false)
			setEnded(true)
		})

		return () => {
			audio.pause()
			audio.removeEventListener('play', () => setPlaying(false))
		}
	}, [audio, id, setAudios])

	const playVerse = () => {
		if (playing) {
			setPlaying(false)
			return audio.pause()
		}

		audios.forEach(({ id, audio }) => {
			if (!audio.paused) {
				audio.pause()
				setPausedAudioId(id)
			}
		})

		setPlaying(true)
		audio.play()
	}

	const playNext = () => {
		const idx = audios.findIndex((a) => a.id === id)
		const nextAudio = idx + 1 === audios.length ? null : audios[idx + 1]

		if (!nextAudio) return
		setAutoPlayedAudId(nextAudio.id)
	}

	useEffect(() => {
		if (ended) {
			playNext()
		}
	}, [ended])

	return {
		playVerse,
		ended,
		playing,
	}
}

export default useAudio
