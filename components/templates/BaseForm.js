import { Colors, Text, View } from "react-native-ui-lib";

import BaseTemplate from "@components/templates/BaseTemplate";
import CoverImage from "@components/organisms/CoverImage";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import TermsConditions from "@components/organisms/TermsConditions";
import ImageBgPNG from "@components/atoms/ImageBgPNG";
import Wrapper from "@components/atoms/Wrapper";
import TextInput from "@components/atoms/TextInput";
import Header from "@components/atoms/Header";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import Button from "@components/atoms/Button";
import { isValidEmail, trimString } from "@utils/validation";

const BaseForm = ({ title = "", children, headerShow = true }) => {
  const navigator = useNavigation();

  return (
    <>
      <ImageBgPNG>
        <Wrapper edges={!headerShow ? ['top', "bottom"] : ["bottom"]} bg="transparent">
          <BaseTemplate scrollable={false}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{
                flex: 1,
                height: "80%",
              }}
            >
                {
                    headerShow ? 
                    <Header
                      title={title}
                      titleColor={Colors.dark}
                      onPressBack={() => {
                        navigator.goBack();
                      }}
                    /> : null
                }
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </BaseTemplate>
        </Wrapper>
      </ImageBgPNG>
    </>
  );
};

export default BaseForm;
