import { Colors, Text, View } from 'react-native-ui-lib'

import BaseTemplate from '@components/templates/BaseTemplate'
import Wrapper from '@components/atoms/Wrapper'
import Toast from 'react-native-toast-message';

const PlaylistPage = () => {
	Toast.show({
		type: 'success',
		text1: 'Cuenta creada correctamente',
		text2: 'Se ha creado la cuenta de manera correcta'
	  });
	return (
		<Wrapper edges={['top', 'bottom']} bg={Colors.screenBG}>
			<BaseTemplate>
				<View flex center>
					<Text text50R color='red'>
						Playlist
					</Text>
				</View>
			</BaseTemplate>
		</Wrapper>
	)
}

export default PlaylistPage
