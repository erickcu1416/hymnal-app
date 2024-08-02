import { Colors, View } from 'react-native-ui-lib'

import { ActivityIndicator } from 'react-native'
import LottieView from 'lottie-react-native'
import PropTypes from 'prop-types'

const AnimatedLoader = ({ width = 200, height = 100 }) => {
	return (
		<View flex center>
			<ActivityIndicator size='small' color={Colors.blue600} />
		</View>
	)
}

AnimatedLoader.propTypes = {}

export default AnimatedLoader
