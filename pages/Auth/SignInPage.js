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
import { useState } from "react";
import Button from "@components/atoms/Button";

const SignInPage = () => {
  const navigator = useNavigation();
  const [contactValue, setContactValue] = useState("");
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
                title={"Crear cuenta"}
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
                      <TextInput
                        input
                        floatingPlaceholder
                        placeholder="Nombre(s)"
                        textContentType="name"
                        inputMode="text"
                        returnKeyType="done"
                        showSoftInputOnFocus
                        autoComplete="name"
                        variant="invert"
                      />
                      <TextInput
                        input
                        floatingPlaceholder
                        placeholder="Apellidos(s)"
                        textContentType="lastname"
                        inputMode="text"
                        returnKeyType="done"
                        showSoftInputOnFocus
                        autoComplete="lastname"
                        variant="invert"
                      />
                      <TextInput
                        input
                        // floatingPlaceholder
                        onChangeText={setContactValue}
                        placeholder="Correo"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        inputMode="email"
                        returnKeyType="done"
                        autoComplete="email"
                        variant="invert"
                        value={contactValue}
                      />
                      <TextInput
                        input
                        floatingPlaceholder
                        placeholder="Contraseña"
                        textContentType="password"
                        inputMode="password"
                        returnKeyType="done"
                        showSoftInputOnFocus
                        autoComplete="password"
                        variant="invert"
                      />
                    </View>
                  </View>
                  <View bottom paddingT-8 paddingB-16 paddingH-20>
                    <Button
                      label="Continuar"
                      variant="primary"
                      onPress={() => {}}
                    />
                    <View row marginT-20 center>
                      <Text color={Colors.white} body1>
                        ¿Olvidaste tu contraseña?
                      </Text>
                      <Button
                        label="Recuperar"
                        link
                        // onPress={() => handleSubmit('whatsapp')}
                      />
                    </View>
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

export default SignInPage;
