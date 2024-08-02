import { Colors, Text, View } from "react-native-ui-lib";

import BaseTemplate from '@components/templates/BaseTemplate'
import CoverImage from "@components/organisms/CoverImage";
import { Dimensions } from "react-native";
import TermsConditions from "@components/organisms/TermsConditions";

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
