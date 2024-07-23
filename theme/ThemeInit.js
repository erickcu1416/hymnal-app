import { Colors, ThemeManager, Typography } from 'react-native-ui-lib'
import { Styles as FontStyles, Fonts } from '@theme/Fonts'

import ColorsPalette from '@theme/Colors'

// import FontsStyles from '@theme/FontsStyles'

const themeInit = () => {
	Colors.loadSchemes({
		light: {
			screenBG: 'transparent',
			textColor: Colors.grey10,
			moonOrSun: Colors.yellow30,
			mountainForeground: Colors.green30,
			mountainBackground: Colors.green50,
			$backgroundSuccess: Colors.green40,
			$backgroundSuccessLight: Colors.green70
		},
		dark: {
			screenBG: Colors.grey10,
			textColor: Colors.white,
			moonOrSun: Colors.grey80,
			mountainForeground: Colors.violet10,
			mountainBackground: Colors.violet20,
			$backgroundSuccess: Colors.green40,
			$backgroundSuccessLight: Colors.green20
		}
	});

	// Colors.loadSchemes(ColorSchema)
	// LoadAssetsGroup()

	Typography.loadTypographies(FontStyles)

	ThemeManager.setComponentTheme('TextField', {
		placeholderTextColor: Colors.gray400,
		floatingPlaceholderColor: Colors.gray400
	})

	ThemeManager.setComponentTheme('Text', {
		defaultColor: Colors.gray900
	})

	// ThemeManager.setComponentTheme('Chip', {
	// 	backgroundColor: Colors.primaryLight,
	// 	labelStyle: {
	// 		color: Colors.secondary
	// 	},
	// 	containerStyle: {
	// 		borderWidth: 0
	// 	}
	// })
}

export default themeInit
