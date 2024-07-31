import { Colors, Fader, Text, View } from 'react-native-ui-lib'

import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const BaseTemplate = ({
	status = Colors.statusStyle,
	bounce = true,
	bgColor = 'transparent',
	children = null,
	scrollable = true,
	style = {}
}) => {
	return (
		<>
			{scrollable ? (
				<ScrollView
					backgroundColor={bgColor}
					bounces={bounce}
					contentContainerStyle={{
						flexGrow: 1,
						backgroundColor: bgColor,
						zIndex: 99,
						...style
					}}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					{children}
				</ScrollView>
			) : (
				<View flex top backgroundColor={bgColor} style={style}>
					{children}
				</View>
			)}
			<StatusBar style={status} />
		</>
	)
}

BaseTemplate.propTypes = {
	status: PropTypes.oneOf(['light', 'dark']),
	bounce: PropTypes.bool,
	bgColor: PropTypes.string,
	children: PropTypes.node.isRequired,
	scrollable: PropTypes.bool
}

export default BaseTemplate
