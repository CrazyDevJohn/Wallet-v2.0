import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

import useAuth from "@/hooks/useAuth";
import { colors } from "@/theme";
import { useRouter } from "expo-router";
import Typo from "./typo";

const Header = ({
  screenName = "home",
}: {
  screenName?: "home" | "salary";
}) => {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const conformLogout = () => {
    Alert.alert("Warning", "Are you sure to logout!", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: handleLogout,
      },
    ]);
  };

  return (
    <View style={styles.header}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View>
          <Typo size={14} color={colors.textLight}>
            Welcome,
          </Typo>
          <Typo
            size={20}
            style={{
              fontWeight: "700",
              textTransform: "capitalize",
              color: colors.text,
            }}
          >
            {user?.name || "John"}
          </Typo>
        </View>
        <TouchableOpacity onPress={() => router.push("/about")}>
          {/* <Image
            source={require("@/assets/images/logo-1.png")}
            style={styles.logo}
          /> */}
          <Image
            source={require("@/assets/images/wallet.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            screenName === "home"
              ? router.push("/create")
              : router.push("/create-pin");
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color={"#fff"} />
          <Typo size={12} color="#fff">
            Add
          </Typo>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={conformLogout}>
          <Ionicons name="log-out-outline" color={colors.primary} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  image: {
    height: 30,
    width: 150,
    resizeMode: "contain",
  },
  logo: {
    width: 60,
    height: 60,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    borderRadius: 30,
  },
});
