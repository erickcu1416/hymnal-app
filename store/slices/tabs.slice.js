import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tab: 'list',
}

const slice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setTab: (state, { payload }) => {
			const res = { ...state, tab: payload }
			return res
		}
	}
})

export const { setTab } = slice.actions

export default slice.reducer

export const selectTab = (state) => state?.tabs?.tab
