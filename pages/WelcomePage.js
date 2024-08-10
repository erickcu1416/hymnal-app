import { Colors, Text, View } from "react-native-ui-lib";
import * as React from "react";
import BaseTemplate from "@components/templates/BaseTemplate";
import CoverImage from "@components/organisms/CoverImage";
import { Dimensions } from "react-native";
import TermsConditions from "@components/organisms/TermsConditions";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CLIENT_ID_IOS, CLIENT_ID_ANDROID } from "@env";
import useUser from "@hooks/useUser";
import { useNavigation } from "@react-navigation/native";
WebBrowser.maybeCompleteAuthSession();

const WelcomePage = () => {
  const navigator = useNavigation();
  const getCoverImageHeight = () => {
    const screenHeight = Dimensions.get("window").height;
    const percent = screenHeight > 800 ? 0.7 : 0.65;
    return screenHeight * percent;
  };

  const { user: userInfo, setNewUser } = useUser();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: CLIENT_ID_IOS,
    androidClientId: CLIENT_ID_ANDROID,
  });


  const singInGoogleFirebaseWithCredential = async (credential) => {
    const currentUser = await signInWithCredential(auth, credential);
    const newUser = {
      uid: currentUser.user.uid,
      displayName: currentUser.user.displayName,
      email: currentUser.user.email,
      emailVerified: currentUser.user.emailVerified,
    }
  
    setNewUser(newUser);
    navigator.navigate('App')
  }

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      singInGoogleFirebaseWithCredential(credential);
    }
  }, [response]);

  return (
    <>
      <BaseTemplate bounce={false}>
        <View height={"100%"}>
          <CoverImage
            onPressGoogle={promptAsync}
            src={require("@assets/bg-initalv2.png")}
            coverTitle={`Tu energía,\nTu ritmo.`}
            height={getCoverImageHeight()}
          >
            <View flex gap={64} paddingH-20>
              <View></View>

              <TermsConditions
                onPressTerms={() =>
                  navigator.navigate("Browser", {
                    url: TERMS_LINK,
                  })
                }
                onPressPrivacy={() =>
                  navigator.navigate("Browser", {
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
