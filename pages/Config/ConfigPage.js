import { Colors, Text, View } from 'react-native-ui-lib'

import BaseTemplate from '@components/templates/BaseTemplate'
import Wrapper from '@components/atoms/Wrapper'
import BtnCustom from "@components/atoms/Button";
import useUser from "@hooks/useUser";

const ConfigPage = () => {
	const { user , logOut } = useUser()
	return (
		<Wrapper edges={['top', 'bottom']} bg={Colors.screenBG}>
			<BaseTemplate>
				<View flex center>
					<Text text50R color='red'>
						Configuración
					</Text>
				</View>
				{
					user ? 
					<BtnCustom
						 variant="primary"
						 label="Cerrar sesión"
						iconOnRight={false}
						onPress={() => {logOut()}}
						/> : null
				}
			</BaseTemplate>
		</Wrapper>
	)
}

export default ConfigPage
