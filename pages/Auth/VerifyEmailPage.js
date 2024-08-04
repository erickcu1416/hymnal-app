import { Colors, Text, View, Button as BtnUI } from "react-native-ui-lib";

import BaseForm from "@components/templates/BaseForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "@components/atoms/Button";
import { Fonts } from "@theme/Fonts";
import CheckIcon from "@assets/icons/check.svg";

const VerifyEmailPage = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { email } = route.params;

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
            onPress={() => navigator.navigate("LoginPage")}
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
            navigator.navigate("WelcomePageAuth")
          }
        />
      </View>
    </BaseForm>
  );
};

export default VerifyEmailPage;
