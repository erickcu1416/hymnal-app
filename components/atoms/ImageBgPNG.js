import { ImageBackground, StyleSheet } from 'react-native'

import { Colors } from 'react-native-ui-lib'
import PropTypes from 'prop-types'

const ImageBgPNG = ({ children }) => {
	return (
		<ImageBackground
			source={require('@assets/bg-inital.png')}
			resizeMode='cover'
			style={styles.background}
		>
			<>
				{children}
			</>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: Colors.white
	}
})

ImageBgPNG.propTypes = {
	children: PropTypes.node
}

export default ImageBgPNG
