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
import {
  isValidEmail,
  trimString,
} from "@utils/validation";


const RecoveryPasswordPage = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <>
      <ImageBgPNG>
        <Wrapper edges={["bottom"]} bg="transparent">
          <BaseTemplate scrollable={false}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{
                flex: 1,
                height: "80%",
              }}
            >
              <Header
                title={"Recuperar contraseña"}
                titleColor={Colors.dark}
                onPressBack={() => {
                  navigator.goBack();
                }}
              />
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View flex top>
                    <View marginH-20 gap={20}>
                    <View marginH-20 center>
                      <Text color={Colors.dark} center subTitle>
                        Ingresa tu correo electrónico y te enviaremos un enlace para que restablezcas tu contraseña.
                      </Text>
                    </View>
                      <TextInput
                        input
                        // floatingPlaceholder
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Correo"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        inputMode="email"
                        returnKeyType="done"
                        autoComplete="email"
                        variant="invert"
                      />
                     
                    </View>
                  </View>
                  <View bottom paddingT-8 paddingB-16 paddingH-20>
                    <Button
                      label="Recuperar contraseña"
                      variant="primary"
                      disabled={
                        !isValidEmail(trimString(email))
                      }
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </BaseTemplate>
        </Wrapper>
      </ImageBgPNG>
    </>
  );
};

export default RecoveryPasswordPage;
