import React, { useState, useEffect, useCallback } from "react";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";

import { Home } from "./src/screens/Home";
import { View } from "react-native";

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
        console.warn(e);
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
    //Quando tiver o Gesture Handler:
    // <GestureHandlerRootView
    //   onLayout={onLayoutRootView}
    //   style={{ flex: 1 }}
    // >
    // </GestureHandlerRootView>
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </View>
  );
}
