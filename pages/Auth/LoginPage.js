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
import {
  getStatusErrorWithOutPrefix
} from "@utils/mappers/firebase-error";
import { useLoaderContext } from "@context/LoaderContext";
import Toast from "react-native-toast-message";
import useAuth from "@hooks/useAuth";

const LoginPage = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoader, hideLoader } = useLoaderContext();

  const passwordInputRef = useRef(null);
  const { logIn, validateEmailOnRegisterOrLogin } = useAuth();
  const onLoginHandler = async () => {
    try {
      showLoader();
      const body = {
        email,
        password,
      };

      const response = await logIn(body);
      if (!response) return; 

      validateEmailOnRegisterOrLogin(response);

      
    } catch (error) {
      const errorInterceptor = getStatusErrorWithOutPrefix(error.code);
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: errorInterceptor?.message || 'Error desconocido',
      });
    } finally {
      hideLoader();
    }
  };

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
                      disabled={!password || !isValidEmail(trimString(email))}
                      onPress={onLoginHandler}
                    />
                    <View row marginT-20 center>
                      <Text color={Colors.white} body1>
                        ¿Olvidaste tu contraseña?
                      </Text>
                      <Button
                        label="Recuperar"
                        link
                        variant="primary"
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
