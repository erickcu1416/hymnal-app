import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { WALLET_URL } from '@env'
import { authBaseQuery } from '../utils/utils'

export const eventsApi = createApi({
	reducerPath: 'eventsApi',
	baseQuery: authBaseQuery({
		baseUrl: `${WALLET_URL}/wallet/v1/wallet`
	}),
	tagTypes: ['activeEvents', 'pastEvents'],
	endpoints: (build) => ({
		getEvents: build.query({
			query: (data) => {
				return {
					url: `/events?status=active&reload=t`,
					method: 'GET'
				}
			},
			keepUnusedDataFor: 0,
			providesTags: ['activeEvents']
		}),
		getPastEvents: build.query({
			query: (data) => {
				return {
					url: `/events?status=past&reload=t`,
					method: 'GET'
				}
			},
			keepUnusedDataFor: 0,
			providesTags: ['pastEvents']
		})
	})
})

export const { useGetEventsQuery, useGetPastEventsQuery } = eventsApi
