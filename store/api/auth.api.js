import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_END_POINT } from '@env'

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['auth'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_END_POINT}/`
	}),
	endpoints: (builder) => ({
		singin: builder.mutation({
			query: credentials => ({
				url: 'auth/register',
				method: 'POST',
				body: credentials
			}),
		}),
		updateUserDisplayName: builder.mutation({
			query: credentials => ({
				url: 'user/update',
				method: 'PATCH',
				body: credentials
			}),
		})
	})
})

export const {
	useSinginMutation,
	useUpdateUserDisplayNameMutation
} = authApi
