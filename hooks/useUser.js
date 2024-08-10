import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useLoaderContext } from "@context/LoaderContext";
import { setProfile, selectProfile } from "@store/slices/auth.slice";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";


const useUser = () => {
  const navigator = useNavigation();

  const { showLoader, hideLoader } = useLoaderContext();
  const dispatch = useDispatch();
  const storedProfile = useSelector(selectProfile);

  const setNewUser = async (user) => {
    const newUser = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
    };

    dispatch(setProfile(newUser));
  };

  const logOut = async () => {
    try {
      showLoader();
      await signOut(auth);
      dispatch(setProfile(null));
      navigator.navigate("HomePage");
    } catch (error) {
    } finally {
      hideLoader();
    }
  };

  const getToken = async () => {
    const newToken = await auth.currentUser?.auth?.currentUser?.getIdToken(
      true
    );
    return newToken;
  };
  

  return {
    user: storedProfile,
    setNewUser,
    logOut,
    getToken,
  };
};

export default useUser;
