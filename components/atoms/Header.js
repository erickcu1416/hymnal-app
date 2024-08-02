import { Colors, Gradient, Text, View } from "react-native-ui-lib";

import { Platform } from "react-native";
import PropTypes from "prop-types";
import BackButton from "@components/atoms/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({
  title = "",
  titleColor = Colors.primary,
  backButton = true,
  onPressBack = () => {},
  leftContent = null,
  rightContent = null,
  style = {},
  useEdges = true,
}) => {
  return (
    <SafeAreaView>
      <View row centerV gap={16} style={style}>
        {backButton ? (
          <View width={'31%'}>
            <BackButton onPress={onPressBack} />
          </View>
        ) : (
          <View width={'31%'}>{leftContent}</View>
        )}
        <View width={'30.2%'}>
          <Text
            screenTitle
            numberOfLines={1}
            allowFontScaling={false}
            color={titleColor}
            center
          >
            {title}
          </Text>
        </View>
        <View>
            {rightContent}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
