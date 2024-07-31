import { Colors, Typography, View } from 'react-native-ui-lib'
import { EventsContextProvider } from '@context/Events'
import Home from '@pages/public/Home'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import RedDot from '@components/atoms/RedDot'
import HomeIcon from '@assets/icons/home.svg'
import SharedIcon from '@assets/icons/icon-shared.svg'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useTabBar from '@hooks/useTabBar'
import Demo from '../pages/public/Demo'
import Config from '../pages/public/Config'

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
			{/* <Stack.Screen name='Account' component={Account} />
			<Stack.Screen name='Notifications' component={Notifications} /> */}
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
	// const { expoPushToken, notification } = useNotifications()

	// const { sharedTickets, sentTickets, refreshEvents } = useEvents()

	// const [deviceToken, { isLoading }] = useDeviceTokenMutation()



	// const registerDevice = async () => {
	// 	try {
	// 		await deviceToken(expoPushToken).unwrap()
	// 	} catch (error) {
	// 		console.log('error', error)
	// 	}
	// }

	// React.useEffect(() => {
	// 	const unsubscribe = navigation.addListener("tabPress", async (e) => {
	// 	 // add your business logic here
	// 	})
	
	// // Unsubscribe to event listener when component unmount
	//  return () => unsubscribe();
	//   }, [ navigation]);

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors.blue600,
				tabBarInactiveTintColor: Colors.gray500,
				tabBarLabelStyle: {
					...Typography.tabBarLabel,
					paddingVertical: Platform.OS === 'ios' ? 0 : 6
				},
				tabBarStyle: {
					paddingVertical: 8,
					backgroundColor: Colors.tabBarColor
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
					tabBarLabel: 'Himnos',
				}}
				Options={{
					tabBarIcon: ({ focused }) => (
						<IconButton
							focused={focused}
							icon={
								<HomeIcon
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
				name='Demo'
				component={Demo}
				options={{
					tabBarLabel: 'Playlist',
				}}
				Options={{
					tabBarIcon: ({ focused }) => (
						<IconButton
							hasNotifications={true}
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
			<Tab.Screen
				name='Configuration'
				component={Config}
				options={{
					tabBarLabel: 'Configuración',
				}}
				Options={{
					tabBarIcon: ({ focused }) => (
						<IconButton
							hasNotifications={true}
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

const PublicScreens = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				swipeEnabled: false
			}}
		>
			<Stack.Screen
				name='App'
				component={AppWithContexts}
				options={{ title: 'Boletia' }}
			/>
		</Stack.Navigator>
	)
}

export default PublicScreens
