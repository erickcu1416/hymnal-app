import { Colors, Text, View } from 'react-native-ui-lib'

import PropTypes from 'prop-types'

const TermsConditions = ({ onPressTerms = () => {}, onPressPrivacy = () => {} }) => {
	return (
		<View paddingH-20>
			<Text caption center numberOfLines={4}>
				<Text caption color={Colors.white}>{'Al registrarse, aceptas nuestros '}</Text>

				<Text caption color={Colors.link} onPress={() => onPressTerms()}>
					Términos
				</Text>

				<Text caption color={Colors.white}>{' y nuestra\n '}</Text>

				<Text caption color={Colors.link} onPress={() => onPressPrivacy()}>
					Política de privacidad
				</Text>
			</Text>
		</View>
	)
}

TermsConditions.propTypes = {
	onPressTerms: PropTypes.func,
	onPressPrivacy: PropTypes.func
}

export default TermsConditions
