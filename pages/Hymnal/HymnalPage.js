import { Colors, Text, View } from 'react-native-ui-lib'

import BaseTemplate from '@components/templates/BaseTemplate'
import Wrapper from '@components/atoms/Wrapper'
import BtnCustom from "@components/atoms/Button";
import { useNavigation } from "@react-navigation/native";
import useAuth from "@hooks/useAuth";
const HymnalPage = () => {
	const navigator = useNavigation();
	const { validateEmailVerify } = useAuth()
	return (
		<Wrapper edges={['top', 'bottom']} bg={Colors.screenBG}>
			<BaseTemplate>
				<View flex center>
					<Text text50R color='red'>
						Himnos
					</Text>
					<BtnCustom
						 variant="primary"
						 label="Login"
						iconOnRight={false}
						onPress={() => {validateEmailVerify()}}
						/>
				</View>
			</BaseTemplate>
		</Wrapper>
	)
}

export default HymnalPage
