import { Button as ButtonUI, Colors, Typography, View } from 'react-native-ui-lib'

import { Fonts } from '@theme/Fonts'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'

function Button(props) {
	const {
		size = 'large',
		variant = 'default',
		inverted = false,
		disabled = false,
		width = '100%',
		link = false,
		icon = null,
		iconOnRight = false,
		active = false,
		...rest
	} = props

	const variants = {
		default: {
			text: Colors.gray800,
			button: {
				backgroundColor: Colors.gray300
			},
			inverted: {
				button: {
					borderColor: Colors.gray200,
					borderWidth: 1,
					backgroundColor: 'transparent'
				},
				text: Colors.gray800,
				bg: {
					backgroundColor: 'transparent'
				}
			},
			link: {
				text: 'white',
				bg: {
					backgroundColor: 'transparent'
				}
			}
		},
		primary: {
			text: Colors.white,
			button: {
				backgroundColor: Colors.buttonPrimary
			},
			inverted: {
				button: {
					borderColor: Colors.primary50,
					borderWidth: 1,
					backgroundColor: Colors.blue50
				},
				text: Colors.buttonPrimary,
				bg: {
					backgroundColor: 'transparent'
				}
			},
			link: {
				text: Colors.buttonPrimary,
				bg: {
					backgroundColor: 'transparent'
				}
			},
		},
		
		outline: {
			text: Colors.buttonPrimary,
			button: {
				backgroundColor: 'transparent'
			},
		},
		filter: {
			text: Colors.gray900,
			button: {
				backgroundColor: 'transparent',
				borderColor: Colors.gray200,
				borderWidth: 1
			},
			inverted: {
				button: {
					borderColor: active ? Colors.blue500 : Colors.gray200,
					borderWidth: 1,
					backgroundColor: 'transparent',
					paddingLeft: 12,
					paddingRight: icon ? 6 : 12,
					flex: 1
				},
				text: active ? Colors.blue500 : Colors.gray900,
				bg: {
					backgroundColor: 'transparent'
				}
			}
		},
		disabled: {
			bg: Colors.neutral90,
			text: Colors.neutral60,
			inverted: {
				button: {
					borderColor: Colors.neutral80,
					borderWidth: 1
				},
				text: Colors.neutral60,
				bg: {
					backgroundColor: 'transparent'
				}
			},
			link: {
				text: Colors.buttonPrimary
			}
		},
		label: {
			fontFamily: variant === 'default' ? Fonts.medium : Fonts.bold,
			margin: 0,
			paddingRight: iconOnRight ? 8 : 0,
			textAlign: 'center'
		},
		iOSLabel: {
			fontWeight: variant === 'default' ? 500 : 700
		},
		resetButton: {
			paddingVertical: 0,
			paddingHorizontal: 0,
			backgroundColor: 'transparent'
		},
		base: {
			paddingVertical: size === 'large' ? 16 : size === 'medium' ? 12 : 8
		}
	}

	const Icon = ({ icon }) => <View marginR-8>{icon}</View>

	const buttonVariant = Object.keys(variants).includes(variant) ? variant : 'default'

	const styleButton = inverted
		? variants[buttonVariant]?.inverted.button
		: link
			? variants.resetButton
			: disabled
				? variants.disabled.button
				: variants[buttonVariant].button

	return (
		<ButtonUI
			{...rest}
			br20
			disabledBackgroundColor={variants.disabled.bg}
			color={
				disabled
					? variants.disabled.text
					: inverted
						? variants[buttonVariant].inverted.text
						: link
							? variants[buttonVariant].link.text
							: disabled
								? variants.disabled.text
								: variants[buttonVariant].text
			}
			style={[variants.base, styleButton]}
			labelStyle={[variants.label, Platform.OS === 'ios' ? variants.iOSLabel : '']}
			labelProps={{
				adjustsFontSizeToFit: false,
				allowFontScaling: false,
				numberOfLines: 1,
				minimumFontScale: 1
			}}
			enableShadow={false}
			iconOnRight={iconOnRight}
			iconSource={() => icon && <Icon icon={icon} />}
			size={size}
			disabled={disabled}
		/>
	)
}

Button.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xSmall']),
	variant: PropTypes.oneOf(['default', 'primary', 'disabled', 'filter', 'outline']),
	inverted: PropTypes.bool,
	disabled: PropTypes.bool,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	link: PropTypes.bool,
	icon: PropTypes.node,
	iconOnRight: PropTypes.bool
}

export default Button
