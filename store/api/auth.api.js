import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_END_POINT } from '@env'

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['auth'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_END_POINT}/auth`
	}),
	endpoints: (builder) => ({
		singin: builder.mutation({
			query: credentials => ({
				url: 'register',
				method: 'POST',
				body: credentials
			}),
		}),
		login: builder.mutation({
			query: credentials => ({
				url: 'auth/sign-in-v1?event_id=1',
				method: 'POST',
				body: credentials
			}),
			transformResponse: (response, meta, arg) => ({
				user: response.User,
				token: response.Access.AuthenticationResult?.AccessToken,
				roles: [],
				expiresIn: response.Access.AuthenticationResult?.ExpiresIn,
				idToken: response.Access.AuthenticationResult?.IdToken,
				refreshToken:
					response.Access.AuthenticationResult?.RefreshToken,
				tokenType: response.Access.AuthenticationResult?.TokenType,
				challengeName: response.Access.ChallengeName,
				challengeParameters: response.Access.ChallengeParameters,
				session: response.Access.Session
			})
		}),
	})
})

export const {
	useSinginMutation
} = authApi
