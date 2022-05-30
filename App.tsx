import React, { useState, useEffect, useCallback } from "react";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";

import { Scheduling } from "./src/screens/Scheduling";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Archivo_400Regular,
          Archivo_500Medium,
          Archivo_600SemiBold,
          Inter_400Regular,
          Inter_500Medium,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Scheduling />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
