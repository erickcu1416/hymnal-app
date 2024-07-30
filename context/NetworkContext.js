import * as Network from 'expo-network'

import React, { createContext, useContext, useEffect, useState } from 'react'

const NetworkContext = createContext(null)

export const useNetwork = () => {
	return useContext(NetworkContext)
}

export const NetworkProvider = ({ children }) => {
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		const checkNetwork = async () => {
			try {
				const networkState = await Network.getNetworkStateAsync()
				setIsConnected(networkState.isConnected && networkState.isInternetReachable)
			} catch (error) {
				console.error('Error checking network state:', error)
				setIsConnected(false)
			}
		}

		checkNetwork()

		const interval = setInterval(checkNetwork, 3500)

		return () => clearInterval(interval)
	}, [])

	return <NetworkContext.Provider value={isConnected}>{children}</NetworkContext.Provider>
}
