import { createContext, useContext, useState } from 'react'

export const LoaderContext = createContext()

export const useLoaderContext = () => useContext(LoaderContext)

export const LoaderContextProvider = ({ children }) => {

	const [loader, setLoader] = useState(false);

	const showLoader = () => {
		setLoader(true)
	}

	const hideLoader = () => {
		setLoader(false)
	}

	return (
		<LoaderContext.Provider
			value={{
				loader,
				showLoader,
				hideLoader
			}}
		>
			{children}
		</LoaderContext.Provider>
	)
}
