// import { Text, View } from 'react-native'
import { Colors, Typography, View } from 'react-native-ui-lib'
import { Contact, Intro, Preview, Processing, Recipient, RecipientName } from '@pages/private/Transfers'
import { RegisterForm, RegisterOTP } from '@pages/private/Register'

import Detail from '@pages/private/Events/Detail'
import ProcessingRecovery from '@pages/private/Events/ProcessingRecovery'

import { EventsContextProvider } from '@context/Events'
import Home from '@pages/private/Home'
import Invitation from '@pages/private/Events/Invitation'
import MyAccount from '@pages/private/Account/MyAccount'
import NoWallet from '@pages/private/Events/NoWallet'
import PendingEvents from '@pages/private/Events/PendingEvents'
import { Platform } from 'react-native'
import ProcessingInvitation from '@pages/private/Events/ProcessingInvitation'
import Profile from '@pages/private/Account/Profile'
import Notifications from '@pages/private/Notifications/Notifications'
import PropTypes from 'prop-types'
import RedDot from '@components/atoms/RedDot'
import SharedIcon from '@assets/icons/icon-shared.svg'
import TicketsIcon from '@assets/icons/ticket.svg'
import { TouchableOpacity } from 'react-native'
import ValidatorScreen from '@pages/private/Validator'
import WebBrowser from '@pages/WebBrowser'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useBrightness } from '@context/BrightnessContext'
import { useDeviceTokenMutation } from '@store/api/user.api'
import { useEffect } from 'react'
import useEvents from '@hooks/useEvents'
import useNotifications from '@hooks/useNotifications'
import useTabBar from '@hooks/useTabBar'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const IconButton = ({ hasNotifications = false, icon }) => {
	return (
		<View center>
			{hasNotifications && <RedDot />}
			<View center>{icon}</View>
		</View>
	)
}

IconButton.propTypes = {
	hasNotifications: PropTypes.bool,
	icon: PropTypes.node.isRequired
}

IconButton.propTypes = {
	focused: PropTypes.bool,
	icon: PropTypes.node.isRequired
}

const TicketDetail = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
				// presentation: 'transparentModal'
			}}
		>
			<Stack.Screen name='TicketDetail' component={Detail} />
			<Stack.Screen name='TransferIntro' component={Intro} />
			<Stack.Screen name='TransferContact' component={Contact} />
			<Stack.Screen name='TransferRecipient' component={Recipient} />
			<Stack.Screen name='TransferRecipientName' component={RecipientName} />
			<Stack.Screen name='TransferPreview' component={Preview} />
			<Stack.Screen name='TransferProcessing' component={Processing} />
			<Stack.Screen name='RecoveryProcessing' component={ProcessingRecovery} />
		</Stack.Navigator>
	)
}

const HomeNav = () => {
	const { setCurrentTab } = useTabBar()

	return (
		<Stack.Navigator
			screenOptions={({ route }) => {
				setCurrentTab(route.name)
				return {
					headerShown: false
				}
			}}
		>
			<Stack.Screen
				name='List'
				component={Home}
				screenOptions={{
					gestureEnabled: false
				}}
			/>
			<Stack.Screen name='Detail' component={TicketDetail} />
			<Stack.Screen
				name='Invitation'
				component={Invitation}
				options={{
					presentation: 'transparentModal'
				}}
			/>
			<Stack.Screen
				name='InvitationProcessing'
				component={ProcessingInvitation}
				options={{
					presentation: 'transparentModal'
				}}
			/>
			<Stack.Screen
				name='HelpTickets'
				component={WebBrowser}
				options={{
					presentation: 'transparentModal'
				}}
			/>
			<Stack.Screen
				name='NoWallet'
				component={NoWallet}
				options={{
					presentation: 'transparentModal'
				}}
			/>
			<Stack.Screen name='Account' component={Account} />
			<Stack.Screen name='Notifications' component={Notifications} />
		</Stack.Navigator>
	)
}

const Account = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name='Profile' component={Profile} />
			<Stack.Screen name='MyAccount' component={MyAccount} />
			<Stack.Screen
				name='HelpWeb'
				component={WebBrowser}
				options={{
					presentation: 'transparentModal'
				}}
			/>
		</Stack.Navigator>
	)
}

const AppWithContexts = () => {
	return (
		<EventsContextProvider>
			<App />
		</EventsContextProvider>
	)
}

const App = () => {
	const { expoPushToken, notification } = useNotifications()

	const { sharedTickets, sentTickets, refreshEvents } = useEvents()

	const [deviceToken, { isLoading }] = useDeviceTokenMutation()

	const { setSystemBrightness, resetBrightness } = useBrightness()

	const { currentTab } = useTabBar()

	const registerDevice = async () => {
		try {
			await deviceToken(expoPushToken).unwrap()
		} catch (error) {
			console.log('error', error)
		}
	}

	const changeDeviceBrightness = (e) => {
		const viewState = e?.data?.state?.routes[0]?.state
		const viewIndex = viewState?.index
		const isEventDetailView = viewState?.routes[viewIndex]?.name === 'Detail'

		if (e?.data?.state?.routes?.length === 0) return

		isEventDetailView ? setSystemBrightness(0.6) : resetBrightness()
	}

	useEffect(() => {
		if (!expoPushToken) return
		registerDevice(expoPushToken)
	}, [expoPushToken])

	useEffect(() => {
		if (!notification) return
		refreshEvents()
	}, [notification])

	return (
		<Tab.Navigator
			screenListeners={({ navigation }) => ({
				state: (e) => {
					changeDeviceBrightness(e)
				}
			})}
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors.blue600,
				tabBarInactiveTintColor: Colors.gray500,
				tabBarLabelStyle: {
					...Typography.tabBarLabel,
					paddingVertical: Platform.OS === 'ios' ? 0 : 6
				},
				tabBarStyle: {
					paddingVertical: 8
					// backgroundColor:
					// 	isEventDetailView && selectedEvent?.event?.high_light_colors?.length > 0
					// 		? `rgba(${selectedEvent?.event?.high_light_colors[0]})`
					// 		: Colors.white
				}
			}}
		>
			<Tab.Screen
				name='Home'
				component={HomeNav}
				listeners={({ navigation }) => ({
					tabPress: (e) => {
						e.preventDefault()
						navigation.navigate('List')
					}
				})}
				options={{
					tabBarLabel: 'Mis boletos',
					tabBarIcon: ({ focused }) => (
						<IconButton
							focused={focused}
							icon={
								<TicketsIcon
									width={20}
									height={20}
									fill={focused ? Colors.blue600 : Colors.gray500}
								/>
							}
						/>
					)
				}}
			/>
			<Tab.Screen
				name='Shared'
				component={PendingEvents}
				options={{
					// tabBarLabelStyle: { paddingVertical: 4 },
					tabBarLabel: 'Compartidos',
					tabBarIcon: ({ focused }) => (
						<IconButton
							hasNotifications={sharedTickets?.length > 0 || sentTickets?.length > 0}
							icon={
								<SharedIcon
									width={20}
									height={20}
									fill={focused ? Colors.blue600 : Colors.gray500}
								/>
							}
						/>
					)
				}}
			/>
		</Tab.Navigator>
	)
}

const PrivateScreens = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				swipeEnabled: false
			}}
		>
			<Stack.Screen
				name='Validator'
				component={ValidatorScreen}
				options={{ title: 'Tus datos, tu boleto seguro' }}
			/>
			<Stack.Screen
				name='Register'
				component={RegisterForm}
				options={{ title: 'Tus datos, tu boleto seguro' }}
			/>
			<Stack.Screen
				name='OtpEmail'
				component={RegisterOTP}
				options={{ title: 'Verifica tu correo' }}
			/>
			<Stack.Screen
				name='App'
				component={AppWithContexts}
				options={{ title: 'Boletia' }}
			/>
		</Stack.Navigator>
	)
}

export default PrivateScreens
