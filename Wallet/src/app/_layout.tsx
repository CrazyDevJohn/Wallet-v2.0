import React, { useEffect, useState, useLayoutEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import "react-native-reanimated";
import useNetChecker from "@/hooks/useNetChecker";
import Loader from "@/components/loader";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.hideAsync();

export default function RootLayout() {
  const { setIsConnected } = useNetChecker();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state?.isConnected || false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "flip",
        }}
      />
      <StatusBar
        // backgroundColor={"#00000000"}
        // translucent={true}
        hidden
        barStyle={"dark-content"}
      />
      <Loader />
    </>
  );
}
