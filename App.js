import './setup';
global.Buffer = global.Buffer || require('buffer').Buffer

import { useFonts } from 'expo-font';
import * as Updates from 'expo-updates'
import * as SplashScreen from 'expo-splash-screen'
import React, { Component, useEffect } from 'react';
import { View, TextField, Text, Button } from 'react-native-ui-lib';
import { themeInit } from '@theme'
import { NetworkProvider } from '@context/NetworkContext'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Index() {
  // const onFetchUpdateAsync = async () => {
  // 	try {
  // 		const update = await Updates.checkForUpdateAsync()

  // 		if (update.isAvailable) {
  // 			await Updates.fetchUpdateAsync()
  // 			await Updates.reloadAsync()
  // 		}
  // 	} catch (error) {
  // 		console.warn(`Error fetching latest Expo update: ${error}`)
  // 		return
  // 	}
  // }

  // // Fetch updates
  // onFetchUpdateAsync()

  // Init base theme configuration
  themeInit()

  const [loaded] = useFonts({
    'AvenirNextCyr-Bold': require('./assets/fonts/AvenirNextCyr-Bold.ttf'),
    'AvenirNextCyr-BoldItalic': require('./assets/fonts/AvenirNextCyr-BoldItalic.ttf'),
    'AvenirNextCyr-Demi': require('./assets/fonts/AvenirNextCyr-Demi.ttf'),
    'AvenirNextCyr-DemiItalic': require('./assets/fonts/AvenirNextCyr-DemiItalic.ttf'),
    'AvenirNextCyr-Heavy': require('./assets/fonts/AvenirNextCyr-Heavy.ttf'),
    'AvenirNextCyr-HeavyItalic': require('./assets/fonts/AvenirNextCyr-HeavyItalic.ttf'),
    'AvenirNextCyr-Italic': require('./assets/fonts/AvenirNextCyr-Italic.ttf'),
    'AvenirNextCyr-Light': require('./assets/fonts/AvenirNextCyr-Light.ttf'),
    'AvenirNextCyr-LightItalic': require('./assets/fonts/AvenirNextCyr-LightItalic.ttf'),
    'AvenirNextCyr-Medium': require('./assets/fonts/AvenirNextCyr-Medium.ttf'),
    'AvenirNextCyr-MediumItalic': require('./assets/fonts/AvenirNextCyr-MediumItalic.ttf'),
    'AvenirNextCyr-Regular': require('./assets/fonts/AvenirNextCyr-Regular.ttf'),
    'AvenirNextCyr-Thin': require('./assets/fonts/AvenirNextCyr-Thin.ttf'),
    'AvenirNextCyr-ThinItalic': require('./assets/fonts/AvenirNextCyr-ThinItalic.ttf'),
    'AvenirNextCyr-UltraLight': require('./assets/fonts/AvenirNextCyr-UltraLight.ttf'),
    'AvenirNextCyr-UltraLightIt': require('./assets/fonts/AvenirNextCyr-UltraLightIt.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NetworkProvider>
      <View flex padding-page bg-screenBG>
        <Text h1 textColor>
          Dark Mode
        </Text>
      </View>
    </NetworkProvider>
  );
}
