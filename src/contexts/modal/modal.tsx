import { createContext, FC, ReactNode, useState } from 'react'

interface InitialContext {
	open: boolean
	show: () => void
	close: () => void
}

interface Props {
	children: ReactNode
}

const initialContext: InitialContext = {
	open: false,
	show: () => {},
	close: () => {},
}

export const ModalContext = createContext(initialContext)

export const ModalProvider: FC<Props> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false)

	const show = () => setOpen(true)
	const close = () => setOpen(false)

	const value = {
		open,
		show,
		close,
	}

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
