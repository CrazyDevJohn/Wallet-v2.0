import { ColorValue, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Tabs } from "expo-router";
import { colors } from "@/theme";
import Background from "@/components/background";
import { Ionicons } from "@expo/vector-icons";
import { BlurTargetView, BlurView } from "expo-blur";

const TabsLayout = () => {
  const BlurViewRef = useRef(null);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          position: "absolute",
          marginHorizontal: "10%",
          width: "80%",
          bottom: 20,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.1)",
          borderColor: colors.text,
          borderWidth: 0.5,
          borderTopWidth: 0.5,
          borderRadius: 15,
          elevation: 0,
          paddingTop: 5,
          overflow: "hidden",
        },
        tabBarBackground: () => (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0.8,
              backgroundColor: colors.primary,
            }}
          >
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 1,
                backgroundColor: colors.neutral800,
              }}
            ></View>
          </View>
        ),
        tabBarInactiveTintColor: colors.text,
        tabBarActiveTintColor: colors.primary,
        tabBarShowLabel: false,
      }}

      //   tabBar={}
    >
      <Tabs.Screen
        name={"home"}
        options={{
          tabBarIcon: ({
            color,
            focused,
            size,
          }: {
            focused: boolean;
            color: ColorValue;
            size: number;
          }) => {
            return (
              <Ionicons
                name="home-outline"
                size={25}
                color={focused ? colors.primary : colors.textLight}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name={"todo"}
        options={{
          tabBarIcon: ({
            color,
            focused,
            size,
          }: {
            focused: boolean;
            color: ColorValue;
            size: number;
          }) => {
            return (
              <Ionicons
                name="pencil"
                size={25}
                color={focused ? colors.primary : colors.textLight}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name={"salary"}
        options={{
          tabBarIcon: ({
            color,
            focused,
            size,
          }: {
            focused: boolean;
            color: ColorValue;
            size: number;
          }) => {
            return (
              <Ionicons
                name="albums-outline"
                size={25}
                color={focused ? colors.primary : colors.textLight}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name={"settings"}
        options={{
          tabBarIcon: ({
            color,
            focused,
            size,
          }: {
            focused: boolean;
            color: ColorValue;
            size: number;
          }) => {
            return (
              <Ionicons
                name="settings-outline"
                size={25}
                color={focused ? colors.primary : colors.textLight}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
