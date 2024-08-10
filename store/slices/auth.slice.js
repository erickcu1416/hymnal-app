import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	profile: null
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setProfile: (state, { payload }) => {
			state.profile = payload
		},
	}
})

export const {  setProfile } = slice.actions

export default slice.reducer

export const selectProfile = (state) => state?.auth.profile
