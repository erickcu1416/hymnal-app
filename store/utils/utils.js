import { WALLET_URL } from '@env'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { jwtDecode } from 'jwt-decode'
import { setCredentials } from '../slices/auth.slice'

const setAuthHeader = (headers, getState) => {
	const { auth } = getState()
	if (auth) {
		const { token, refreshToken } = auth
		if (token && refreshToken) {
			headers.set('authorization', `Bearer ${token}`)
		}
	}

	return headers
}

const getAdjustedArgs = (args, preUrl = '', postUrl = '') => {
	const urlEnd = typeof args === 'string' ? args : args.url
	const adjustedUrl = `${preUrl}${urlEnd}${postUrl}`
	return typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl }
}

const authBaseQuery = (params) => {
	const rawBaseQuery = fetchBaseQuery({
		baseUrl: params.baseUrl,
		prepareHeaders: (headers, api) =>
			params.prepareHeaders
				? params.prepareHeaders(setAuthHeader(headers, api.getState), api)
				: setAuthHeader(headers, api.getState)
	})

	const prepareUrlDefault = (state, endpoint, url) => url

	const authResponseBaseQuery = async (args, api, extraOptions) => {
		const state = api.getState()
		const { auth } = state

		const urlEnd = typeof args === 'string' ? args : args.url

		if (!auth || !auth.token) {
			return {
				error: {
					status: 400,
					statusText: 'Bad Request',
					data: 'No auth received'
				}
			}
		}

		const adjustedUrl = params.prepareUrl
			? params.prepareUrl(state, api.endpoint, urlEnd)
			: prepareUrlDefault(state, api.endpoint, urlEnd)

		if (adjustedUrl && adjustedUrl.error) {
			return adjustedUrl
		}

		const adjustedArgs =
			typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl }

		let result = await rawBaseQuery(adjustedArgs, api, extraOptions)

		if (result?.error?.status === 401 || result?.error?.status === 403) {
			// api.dispatch(
			// 	setCredentials({
			// 		token: null,
			// 		refreshToken: null
			// 	})
			// )
			if (!auth?.refreshToken) {
				api.dispatch(
					setCredentials({
						token: null,
						refreshToken: null
					})
				)
			}

			const decodedToken = jwtDecode(auth.token)

			const refreshResult = await authBaseQuery(
				{
					url: `${WALLET_URL}/wallet-users/v1/wallet/auth/refresh-token`,
					method: 'POST',
					body: {
						refresh_token: auth.refreshToken,
						cognito_user: decodedToken?.username
					}
				},
				api,
				extraOptions
			)

			if (refreshResult?.error) {
				api.dispatch(
					setCredentials({
						token: null,
						refreshToken: null
					})
				)
			} else {
				api.dispatch(
					setCredentials({
						token: refreshResult?.data?.access_token,
						refreshToken: auth?.refresh_token
					})
				)
				const resultRefresh = await rawBaseQuery(adjustedArgs, api, extraOptions)

				return resultRefresh
			}
		}
		return result
	}

	return authResponseBaseQuery
}

export { setAuthHeader, getAdjustedArgs, authBaseQuery }
