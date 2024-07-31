import { createContext, useContext, useEffect, useState } from 'react'

import useEvents from '@hooks/useEvents'

export const EventsContext = createContext()

export const useEventsContext = () => useContext(EventsContext)

export const EventsContextProvider = ({ children }) => {
	const { events } = useEvents()

	const [selectedEvent, setSelectedEvent] = useState(null)

	const setSelectedEventValue = (event) => {
		setSelectedEvent(event)
	}

	useEffect(() => {
		if (events?.length === 0) return

		const event = events?.find((e) => e.id === selectedEvent?.event?.id)

		if (!event || event === undefined) return

		const newEvent = {
			event
		}

		setSelectedEvent(newEvent)
	}, [events])

	return (
		<EventsContext.Provider
			value={{
				selectedEvent,
				setSelectedEventValue
			}}
		>
			{children}
		</EventsContext.Provider>
	)
}
