import { NavigationContainer } from '@react-navigation/native'
import PublicScreens from './PublicScreens.js'

const Router = () => {
	return (
		<NavigationContainer>
			{PublicScreens()}
		</NavigationContainer>
	)
}

export default Router
