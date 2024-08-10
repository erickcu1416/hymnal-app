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
import { useEffect, useState } from "react";
import { readableTime } from "@utils/time";

const TIME_TO_WAIT = 60

const VerifyEmailPage = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const { logOut } = useUser();
  const { sendEmailVerificationForUser } = useAuth();
  const { showLoader, hideLoader } = useLoaderContext();
  const [resend, setResend] = useState(true);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(-1);
  const currentTime = readableTime(time);

  const sendEmailVerificationForUserHandler = () => {
    try {
      showLoader();
      handleStart();
      sendEmailVerificationForUser();
      Toast.show({
        type: "success",
        text1: "Se ha enviado el correo de verificación exitosamente",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Ocurrió un error al procesar la solicitud",
      });
    } finally {
      hideLoader();
    }
  };

  const reset = () => {
    setTime(0);
  };

  useEffect(() => {
    let timerID;
    if (status === 1) {
      timerID = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(timerID);
      if (status === -1) reset();
    }
    return () => {
      clearInterval(timerID);
    };
  }, [status]);

  useEffect(() => {
    if (time === TIME_TO_WAIT) {
      handleStop();
    }
  }, [time]);

  const handleStart = () => {
    setResend(false);
    setStatus(1);
  };

  const handleStop = () => {
    setResend(true);
    setStatus(-1);
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
          {!resend ? (
            <Text color={Colors.neutral80} center caption>
              Espera {TIME_TO_WAIT} segundos para reenviar un nuevo email: {currentTime}
            </Text>
          ) : (
            <Button
              label={`Reenviar correo`}
              link
              onPress={sendEmailVerificationForUserHandler}
            />
          )}

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
