import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import * as Sentry from '@sentry/react-native'

import { useEffect, useRef, useState } from 'react'

import { Colors } from 'react-native-ui-lib'
import Constants from 'expo-constants'
import Errors from '@utils/errors'
import { Platform } from 'react-native'
import useEvents from './useEvents'
import { useToast } from 'react-native-toast-notifications'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	})
})

const useNotifications = () => {
	const [expoPushToken, setExpoPushToken] = useState('')
	const [notification, setNotification] = useState(null)
	const [notificationPressed, setNotificationPressed] = useState(null)
	const notificationListener = useRef(null)
	const responseListener = useRef(null)
	const toast = useToast()

	const { refreshEvents } = useEvents()

	const returnToken = async () => {
		try {
			// const token = await Notifications.getExpoPushTokenAsync({
			// 	projectId: Constants.expoConfig.extra.eas.projectId
			// })
			// return token.data
			return ''
		} catch (error) {
			// Sentry.captureException(error)
		}

		return null
	}

	const resetPressedNotification = () => {
		setNotificationPressed(null)
	}

	const resetNotification = () => {
		setNotification(null)
	}

	useEffect(() => {
		const registerForPushNotificationsAsync = async () => {
			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: Colors.blue600
				})
			}

			if (Device.isDevice) {
				const { status: existingStatus } = await Notifications.getPermissionsAsync()
				let finalStatus = existingStatus

				if (existingStatus !== 'granted') {
					const { status } = await Notifications.requestPermissionsAsync({
						ios: {
							allowAlert: true,
							allowBadge: true,
							allowSound: true,
							allowAnnouncements: true
						}
					})
					finalStatus = status
				}

				if (finalStatus !== 'granted') {
					toast.show(Errors.WALLET_PUSH_NOTIFICATIONS_NOT_GRANTED, {
						type: 'error'
					})
					Sentry.captureException('Failed to get push token for push notifications.')
				}

				return returnToken()
			} else {
				toast.show(Errors.WALLET_NOT_PHYSICAL_DEVICE, {
					type: 'error'
				})
			}
		}

		registerForPushNotificationsAsync()
			.then((token) => setExpoPushToken(token))
			.catch((err) => console.warn(err))

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification)
			}
		)

		responseListener.current = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				setNotificationPressed(response)
			}
		)

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])

	return {
		expoPushToken,
		notification,
		resetNotification,
		notificationPressed,
		resetPressedNotification
	}
}

export default useNotifications
