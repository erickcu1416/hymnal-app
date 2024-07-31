import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View } from 'react-native-ui-lib'

const RedDot = ({ children }) => {
	return (
		<View>
			<View abs br100 width={12} height={12} bg-orange500 zIndex={2} style={styles.dot} />
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	dot: {
		right: -22,
		top: -4
	}
})

RedDot.propTypes = {
	children: PropTypes.element
}

export default RedDot
