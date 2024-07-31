import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wrapper = ({ children, edges = ['top'], bg = 'white', style = {} }) => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: bg, ...style }} edges={edges}>
			{children}
		</SafeAreaView>
	)
}

Wrapper.propTypes = {
	children: PropTypes.node.isRequired,
	edges: PropTypes.arrayOf(PropTypes.string),
	bg: PropTypes.string,
	style: PropTypes.object
}

export default Wrapper
