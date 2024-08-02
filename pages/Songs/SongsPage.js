import { Colors, Text, View } from 'react-native-ui-lib'

import BaseTemplate from '../../components/templates/BaseTemplate'
import Wrapper from '@components/atoms/Wrapper'

const SongsPage = () => {
	return (
		<Wrapper edges={['top', 'bottom']} bg={Colors.screenBG}>
			<BaseTemplate>
				<View flex center>
					<Text text50R color='red'>
						Mis canciones
					</Text>
				</View>
			</BaseTemplate>
		</Wrapper>
	)
}

export default SongsPage
