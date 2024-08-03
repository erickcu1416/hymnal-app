import { NavigationContainer } from '@react-navigation/native'
import PublicScreens from './PublicScreens.js'
import AnimatedLoader from "@components/atoms/AnimatedLoader";

const Router = () => {
	return (
		<NavigationContainer>
			<AnimatedLoader />
			<PublicScreens />
		</NavigationContainer>
	)
}

export default Router
