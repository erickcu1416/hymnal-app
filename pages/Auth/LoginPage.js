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
  isValidPasswordFormat,
  trimString,
} from "@utils/validation";

const LoginPage = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInputRef = useRef(null);

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
                title={"Inciar sesión"}
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
                        onSubmitEditing={() => {
                          passwordInputRef.current.focus();
                        }}
                        // floatingPlaceholder
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Correo"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        inputMode="email"
                        returnKeyType="next"
                        autoComplete="email"
                        variant="invert"
                      />
                      <TextInput
                        input
                        ref={passwordInputRef}
                        floatingPlaceholder
                        placeholder="Contraseña"
                        textContentType="password"
                        inputMode="password"
                        returnKeyType="done"
                        showSoftInputOnFocus
                        autoComplete="password"
                        variant="invert"
                        password
                        onChangeText={setPassword}
                        value={password}
                      />
                    </View>
                  </View>
                  <View bottom paddingT-8 paddingB-16 paddingH-20>
                    <Button
                      label="Continuar"
                      variant="primary"
                      disabled={
                        !isValidPasswordFormat(trimString(password)) ||
                        !isValidEmail(trimString(email))
                      }
                      onPress={() => {}}
                    />
                    <View row marginT-20 center>
                      <Text color={Colors.white} body1>
                        ¿Olvidaste tu contraseña?
                      </Text>
                      <Button
                        label="Recuperar"
                        link
                        onPress={() =>
                          navigator.navigate("RecoveryPasswordPage")
                        }
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

export default LoginPage;
