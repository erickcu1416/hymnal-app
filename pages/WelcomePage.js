import { Colors, Text, View } from "react-native-ui-lib";

import BaseTemplate from "../components/templates/BaseTemplate";
import Wrapper from "@components/atoms/Wrapper";
import CoverImage from "@components/organisms/CoverImage";
import { Dimensions } from "react-native";
import Button from "@components/atoms/Button";
import IconWhitePhone from "@assets/icons/icon-white-phone.svg";
import TermsConditions from "@components/organisms/TermsConditions";
import CloseButton from "@components/atoms/ButtonClose";

const WelcomePage = () => {
  const getCoverImageHeight = () => {
    const screenHeight = Dimensions.get("window").height;
    const percent = screenHeight > 800 ? 0.7 : 0.65;
    return screenHeight * percent;
  };
  return (
    <>
      <BaseTemplate bounce={false}>
        <View height={"100%"}>
          <CoverImage
            src={require("@assets/bg-initalv2.png")}
            coverTitle={`Tu energía,\nTu ritmo.`}
            height={getCoverImageHeight()}
          >
			
            <View flex gap={64} paddingH-20>
              <View></View>
              {/* <Button
                variant="primary"
                label="Continua con tu celular"
                iconOnRight={false}
                icon={<IconWhitePhone />}
                // onPress={() => setPhoneDialogVisible(true)}
              /> */}
              <TermsConditions
                onPressTerms={() =>
                  navigation.navigate("Browser", {
                    url: TERMS_LINK,
                  })
                }
                onPressPrivacy={() =>
                  navigation.navigate("Browser", {
                    url: PRIVACY_LINK,
                  })
                }
              />
            </View>
          </CoverImage>
        </View>
      </BaseTemplate>
    </>
  );
};

export default WelcomePage;
