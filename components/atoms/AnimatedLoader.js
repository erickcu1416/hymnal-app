import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import LoaderKit, { animations } from "react-native-loader-kit";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

const AnimatedLoader = () => {
  const fadeInOpacity = useSharedValue(0);

  const fadeIn = () => {
    fadeInOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.linear,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInOpacity.value, // Use the value directly
    };
  });

  useEffect(() => {
    fadeIn()
  
  }, [])
  

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={{ margin: 10, backgroundColor: "transparent" }}>
        <LoaderKit
          style={{ width: 50, height: 50, marginTop: 3 }}
          name={"BallSpinFadeLoader"}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(208, 213, 218, 0.6)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimatedLoader;
