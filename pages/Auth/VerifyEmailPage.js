import { Colors, Text, View, Button as BtnUI } from "react-native-ui-lib";

import BaseForm from "@components/templates/BaseForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "@components/atoms/Button";
import { Fonts } from "@theme/Fonts";
import CheckIcon from "@assets/icons/check.svg";
import useUser from "@hooks/useUser";
import useAuth from "@hooks/useAuth";
import { useLoaderContext } from "@context/LoaderContext";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

const VerifyEmailPage = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const { logOut } = useUser();
  const { sendEmailVerificationForUser } = useAuth();
  const { showLoader, hideLoader } = useLoaderContext();
  useEffect(() => {
    Toast.show({
      type: "success",
      text1: "Se ha enviado el correo de verificación exitosamente",
    });
  }, [])
  

  const sendEmailVerificationForUserHandler = () => {
    try {
      showLoader();
      sendEmailVerificationForUser();
      Toast.show({
        type: "success",
        text1: "Se ha enviado el correo de verificación exitosamente",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: 'Ocurrió un error al procesar la solicitud',
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <BaseForm headerShow={false} title={"Verificar correo"}>
      <View flex centerV>
        <View marginH-20 gap={40}>
          <View center>
            <View
              center
              br100
              backgroundColor={"rgba(208, 213, 218, 0.6)"}
              width={150}
              height={150}
            >
              <CheckIcon width={120} height={120} fill={Colors.green10} />
            </View>
          </View>
          <View marginH-20 center centerV>
            <Text color={Colors.white} center subTitle>
              Se ha enviado un correo a {email.toLowerCase() || ""}, revisa tu
              bandeja de entrada y presiona el enlace para confirmar que eres
              tú.
            </Text>
          </View>
        </View>
      </View>
      <View bottom paddingT-8 paddingB-16 paddingH-20 gap={20}>
        <View gap={10}>
          <Button
            label="Reenviar correo"
            link
            onPress={sendEmailVerificationForUserHandler}
          />
          <Button
            label="Hecho"
            variant="primary"
            onPress={() => {
              navigator.navigate("App");
            }}
          />
        </View>
        <BtnUI
          label="Reiniciar proceso de ingreso"
          link
          labelStyle={{ fontSize: 13, fontFamily: Fonts.light, color: "black" }}
          onPress={() =>
            // TODO: Agregar eliminar token
            logOut()
          }
        />
      </View>
    </BaseForm>
  );
};

export default VerifyEmailPage;
