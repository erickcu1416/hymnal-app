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
import { useEffect, useRef, useState } from "react";
import Button from "@components/atoms/Button";
import {
  isValidEmail,
  isValidPasswordFormat,
  trimString,
} from "@utils/validation";
import { useSinginMutation } from "@store/api/auth.api";
import { useLoaderContext } from "@context/LoaderContext";
import Toast from "react-native-toast-message";

const SignInPage = () => {
  const navigator = useNavigation();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [requesSingIn, { isLoading: isLoadingRequestSingIn }] =
    useSinginMutation();

  const { showLoader, hideLoader } = useLoaderContext();

  const onCreateAccount = async () => {
    try {
      showLoader();
      const body = {
        name,
        last_name: lastName,
        email,
        password,
      };
      const response = await requesSingIn(body);
      if (response.error) {
        console.log('esponse.error', response.error.data.message)
        Toast.show({
          type: "error",
          text1: "Ops!",
          text2: response.error.data.message,
        });
      } else {
        navigator.navigate('VerifyEmailPage', {email: email})
      }
      console.log("response", response);
    } catch (error) {
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
                        returnKeyType="next"
                        showSoftInputOnFocus
                        autoComplete="name"
                        variant="invert"
                        onChangeText={setName}
                        onSubmitEditing={() => {
                          lastNameInputRef.current.focus();
                        }}
                        value={name}
                      />
                      <TextInput
                        input
                        ref={lastNameInputRef}
                        onSubmitEditing={() => {
                          emailInputRef.current.focus();
                        }}
                        floatingPlaceholder
                        placeholder="Apellidos(s)"
                        textContentType="lastname"
                        inputMode="text"
                        returnKeyType="next"
                        showSoftInputOnFocus
                        autoComplete="lastname"
                        variant="invert"
                        onChangeText={setLastName}
                        value={lastName}
                      />
                      <TextInput
                        input
                        ref={emailInputRef}
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
                    {passwordInputRef?.current?.isFocused() ? (
                      <View paddingH-20 marginT-8>
                        <Text color={Colors.white} caption>
                          La contraseña debe tener al menos 8 caracteres e
                          incluir letras, números y símbolos.
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View bottom paddingT-8 paddingB-16 paddingH-20>
                    <Button
                      label="Continuar"
                      variant="primary"
                      disabled={
                        !name ||
                        !isValidPasswordFormat(trimString(password)) ||
                        !lastName ||
                        !isValidEmail(trimString(email))
                      }
                      onPress={onCreateAccount}
                    />
                    <View row marginT-20 center>
                      <Text color={Colors.white} body1>
                        ¿Ya tienes una cuenta?
                      </Text>
                      <Button
                        label=" Iniciar sesión"
                        link
                        variant='primary'
                        onPress={() => navigator.navigate("LoginPage")}
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
