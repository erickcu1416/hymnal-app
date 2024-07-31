import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	events: [],
	pastEvents: []
}

const slice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setEvents: (state, { payload }) => {
			const res = { ...state, events: payload }
			return res
		},
		setPastEvents: (state, { payload }) => {
			const res = { ...state, pastEvents: payload }
			return res
		},
		resetEvents: (state) => {
			const res = { ...state, events: [] }
			return res
		},
		resetPastEvents: (state) => {
			const res = { ...state, pastEvents: [] }
			return res
		},
		resetAllEvents: () => initialState
	}
})

export const { setEvents, setPastEvents, resetEvents, resetPastEvents, resetAllEvents } =
	slice.actions

export default slice.reducer

export const selectEvents = (state) => state?.events?.events
export const selectPastEvents = (state) => state?.events?.pastEvents

export const selectTotal = (state) => state?.events?.events?.length || 0
export const selectTotalPast = (state) => state?.events?.pastEvents?.length || 0
