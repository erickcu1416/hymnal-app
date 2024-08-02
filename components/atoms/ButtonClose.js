import { Colors, Shadows, View } from 'react-native-ui-lib'

import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

const ButtonClose = ({ onPress = () => {} }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				br100
				padding-10
				{...Shadows.sh10.bottom}
			>
				<Feather name='x' size={24} color={Colors.dark} />
			</View>
		</TouchableOpacity>
	)
}

ButtonClose.propTypes = {
	onPress: PropTypes.func
}

export default ButtonClose
