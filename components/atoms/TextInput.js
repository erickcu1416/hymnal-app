import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Colors, TextField, Typography } from 'react-native-ui-lib'
import { forwardRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'

const TextInput = forwardRef((props, ref) => {
	const {
		textContentType = 'none',
		isLoading = false,
		leftIcon = null,
		variant = 'default',
		editable = true,
		password = false,
		floatingPlaceholder = true,
		value = '',
		...rest
	} = props

	const [focus, setFocus] = useState(false)
	const [inputLock, setLock] = useState(true)

	const Loading = () => {
		return <ActivityIndicator color={Colors.disabledText} />
	}

	const EyeLock = ({ closed = true, onPress = () => {} }) => {
		return (
			<TouchableOpacity onPress={() => onPress()}>
				<Feather name={closed ? 'eye' : 'eye-off'} size={24} color={Colors.primary} />
			</TouchableOpacity>
		)
	}

	EyeLock.propTypes = {
		closed: PropTypes.bool,
		onPress: PropTypes.func
	}

	const isActive = editable && (focus || value.length > 0)

	const variants = {
		default: {
			textField: Colors.black,
			field: {
				fontSize: 46,
				paddingVertical: 16,
				paddingHorizontal: 8,
				borderWidth: 1,
				borderColor: isActive ? Colors.primary60 : Colors.neutral20,
				borderRadius: 6,
				backgroundColor: editable ? 'transparent' : Colors.neutral10
			},
			label: {
				color: Colors.blue600
			},
			floatingLabel: {
				top: isActive ? -12 : 0,
				backgroundColor: isActive ? 'transparent' : 'transparent',
				paddingHorizontal: isActive ? 4 : 0,
				zIndex: 99,
				position: isActive ? 'absolute' : 'relative',
				color: isActive ? Colors.primary60 : Colors.neutral40,
				...Typography.inputFloatingLabel
			}
		},
		invert: {
			textField: Colors.white,
			field: {
				fontFamily: 'AvenirNextCyr-Demi',
				paddingBottom: 5,
				paddingHorizontal: 8,
				borderBottomWidth: 1,
				borderColor: isActive ? Colors.neutral90 : Colors.neutral90,
				color: Colors.white,
				borderRadius: 6,
				backgroundColor: editable ? 'transparent' : Colors.neutral20
			},
			floatingLabel: {
				top: isActive ? -6 : -4,
				fontSize: isActive ? 12 : 16,
				color: isActive ? Colors.neutral90 : Colors.neutral90,
				fontFamily: !isActive ? 'AvenirNextCyr-Medium': 'AvenirNextCyr-Demi',
				...Typography.inputFloatingLabel
			}
		}
	}

	const InputAccessory = () => {
		return password && !isLoading ? (
			<EyeLock closed={inputLock} onPress={() => setLock(!inputLock)} />
		) : !inputLock && isLoading ? (
			<Loading />
		) : null
	}

	return (
		<TextField
			{...rest}
			ref={ref}
			labelStyle={variants[variant].label}
			fieldStyle={variants[variant].field}
			floatingPlaceholderStyle={variants[variant].floatingLabel}
			color={variants[variant].textField}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			trailingAccessory={InputAccessory()}
			// placeholderTextColor={Colors.gray400}
			// floatingPlaceholderColor={Colors.gray400}
			leadingAccessory={leftIcon}
			secureTextEntry={password}
			floatingPlaceholder={floatingPlaceholder}
			floatOnFocus
			editable={editable}
			textContentType={textContentType}
			value={value}
			charCounterStyle={{
				color: Colors.gray500,
				marginTop: 3,
				marginRight: 3,
				...Typography.caption
			}}
		/>
	)
})

export const RefTextInput = forwardRef((props, ref) => <TextInput ref={ref} {...props} />)

export const TextInputPropTypes = {
	textContentType: PropTypes.string,
	isLoading: PropTypes.bool,
	leftIcon: PropTypes.element,
	variant: PropTypes.oneOf(['default', 'otp']),
	editable: PropTypes.bool,
	password: PropTypes.bool,
	value: PropTypes.string
}

export default TextInput
