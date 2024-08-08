import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoaderContext } from "@context/LoaderContext";
import moment from "moment";
import { setProfile, selectProfile } from "@store/slices/auth.slice";
import { auth, getAuth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const useUser = () => {
  const navigator = useNavigation();

  const { showLoader, hideLoader } = useLoaderContext();
  const dispatch = useDispatch();
  const storedProfile = useSelector(selectProfile);

  const setNewUser = async (user) => {
    const newUser = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.email,
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
