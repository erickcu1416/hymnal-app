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
          <View width={'25%'}>
            <BackButton onPress={onPressBack} />
          </View>
        ) : (
          <View width={'25%'}>{leftContent}</View>
        )}
        <View width={'45.2%'} center>
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
        <View width={'25%'}>
            {rightContent}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
