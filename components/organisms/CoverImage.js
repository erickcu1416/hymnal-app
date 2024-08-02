import {
  Colors,
  Text,
  View,
  Typography,
  Button,
  Assets,
  Image,
} from "react-native-ui-lib";
import { Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import IconGoogle from "@assets/icons/icon-google.svg";
import { ImageBackground } from "react-native";
import BtnCustom from "@components/atoms/Button";
import PropTypes from "prop-types";
import IconWhitePhone from "@assets/icons/icon-white-phone.svg";
import Divider from "@components/atoms/Divider";
import CloseButton from "@components/atoms/ButtonClose";
import { useNavigation } from "@react-navigation/native";
const settingsIcon = Assets.getAssetByPath("icons.demo.settings");

const CoverImage = ({
  coverTitle = "",
  src = "",
  width = "100%",
  height = "auto",
  children,
}) => {
  const navigator = useNavigation();
  const [counter, setCounter] = useState(0);
  const texts = [
    "con código QR dinámico.",
    "transfiere tu boleto sin costo.",
    "aún sin internet.",
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const changeText = () => {
    if (counter === 2) {
      setCounter((prev) => prev - 2);
    } else {
      newCounter = counter + 1;
      setCounter((prev) => {
        if (prev === 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }
  };

  useEffect(() => {
    fadeIn();
    const animatedText = setInterval(() => {
      fadeOut();
      setTimeout(() => {
        changeText();
      }, 1000);
      setTimeout(() => {
        fadeIn();
      }, 1000);
    }, 4500);

    return () => clearInterval(animatedText);
  }, []);

  return (
    <View center bg-white>
      <ImageBackground
        source={src}
        style={{ width, height: "100%" }}
        resizeMode="stretch"
      >
        <View row right>
          <View marginT-50 marginH-16 right>
            <CloseButton onPress={() => navigator.navigate("App")} />
          </View>
        </View>
        <View height={height} flex top gap={20}>
          <View marginT-45 center>
            <Text h5 center color={Colors.primary30}>
              Hymnal App
            </Text>
          </View>

          <View center>
            <Text coverTitle center color={Colors.neutral100}>
              ¡A Dios sea la Gloria!
            </Text>
          </View>
          <View center>
            <Text color={Colors.white} subTitle>
              Continuar con
            </Text>
          </View>
          <View center>
            <Button
              round
              backgroundColor={Colors.white}
              enableShadow
              style={{ width: 60, height: 60 }}
              iconSource={() => (
                <View>
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require("@assets/images/google-logo.webp")}
                  />
                </View>
              )}
            />
          </View>
          <View row paddingH-20 gap={10}>
            <View width={"45%"} marginT-12>
              <Divider />
            </View>
            <Text color={Colors.white} subTitle>
              O
            </Text>
            <View width={"45%"} marginT-12>
              <Divider />
            </View>
          </View>
          <View paddingH-20>
            <BtnCustom
              variant="primary"
              label="Crear cuenta gratis"
              iconOnRight={false}
              onPress={() => navigator.navigate("SingInPage")}
            />
          </View>
          <View center>
            <BtnCustom
              label="Ingresar"
              link
              // onPress={() => handleSubmit('whatsapp')}
            />
          </View>
        </View>
        {children}
      </ImageBackground>
    </View>
  );
};

CoverImage.propTypes = {
  coverTitle: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CoverImage;
