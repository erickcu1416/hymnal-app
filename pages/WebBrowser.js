import { useNavigation, useRoute } from '@react-navigation/native'

import AnimatedLoader from '@components/atoms/AnimatedLoader'
import BaseTemplate from '@components/templates/BaseTemplate'
import ButtonClose from '@components/atoms/ButtonClose'
import PropTypes from 'prop-types'
import { View } from 'react-native-ui-lib'
import { WebView } from 'react-native-webview'
import Wrapper from '@components/atoms/Wrapper'
import { useState } from 'react'

const WebBrowser = ({ url = 'https://boletia.com' }) => {
	const navigation = useNavigation()
	const route = useRoute()
	const { url: routeUrl } = route.params
	const [isLoading, setIsLoading] = useState(true)

	return (
		<Wrapper edges={['top']} bg='white'>
			<BaseTemplate status='dark' scrollable={false}>
				<View flex bg-white>
					<View centerV right paddingH-20 marginB-10>
						<ButtonClose onPress={() => navigation.goBack()} />
					</View>
					<View flex>
						{isLoading && (
							<View flex absF center zIndex={5} bg-white>
								<AnimatedLoader />
							</View>
						)}
						{url && (
							<WebView
								source={{ uri: routeUrl }}
								onLoadStart={(syntheticEvent) => {
									const { nativeEvent } = syntheticEvent
									setIsLoading(nativeEvent.loading)
								}}
								onLoadEnd={(syntheticEvent) => {
									const { nativeEvent } = syntheticEvent
									setIsLoading(nativeEvent.loading)
								}}
							/>
						)}
					</View>
				</View>
			</BaseTemplate>
		</Wrapper>
	)
}

WebBrowser.propTypes = {
	url: PropTypes.string
}

export default WebBrowser
