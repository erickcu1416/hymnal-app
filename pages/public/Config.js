import { Colors, Text, View } from 'react-native-ui-lib'

import BaseTemplate from '../../components/templates/BaseTemplate'
import Wrapper from '@components/atoms/Wrapper'

const Config = () => {
	return (
		<Wrapper edges={['top', 'bottom']} bg={Colors.screenBG}>
			<BaseTemplate>
				<View flex center>
					<Text text50R color='red'>
						Configuración
					</Text>
				</View>
			</BaseTemplate>
		</Wrapper>
	)
}

export default Config
