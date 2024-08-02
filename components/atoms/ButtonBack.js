import { Colors, TouchableOpacity } from 'react-native-ui-lib'

import { Feather, MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

const ButtonBack = ({ onPress = () => {} }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeBackgroundColor='transparent'
			backgroundColor='transparent'
			br100
			padding-10
			activeOpacity={0.8}
		>
			<MaterialIcons name="arrow-back-ios-new" size={24} color={Colors.dark} />
		</TouchableOpacity>
	)
}

ButtonBack.propTypes = {
	onPress: PropTypes.func
}

export default ButtonBack
