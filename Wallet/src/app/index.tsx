import Background from "@/components/background";
import Typo from "@/components/typo";
import Wrapper from "@/components/wrapper";
import useAuth from "@/hooks/useAuth";
import useNetChecker from "@/hooks/useNetChecker";
import { colors } from "@/theme";
import { ScreenSize } from "@/utils/styling";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-simple-toast";

const Splash = () => {
  const router = useRouter();
  const { isConnected } = useNetChecker();
  const { getUser, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    if (isAuthenticated) {
      router.replace("/home");
      return null;
    }
    router.replace("/login");
  };

  useEffect(() => {
    setIsLoading(true);
    if (!isConnected) {
      Toast.show("No internet connection!", 3000);
      setIsLoading(false);
    }
    if (isConnected) {
      Toast.show("We are authentication you!", 2000);
      getUser();
      setTimeout(() => {
        setIsLoading(false);
      }, 3500);
    }
  }, [isConnected, getUser, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Background />
      <Image
        source={require("@/assets/images/wallet.png")}
        style={styles.logo}
        tintColor={colors.secondary}
      />

      <TouchableOpacity
        style={styles.btn}
        disabled={isLoading || !isConnected}
        activeOpacity={0.8}
        onPress={handleNavigation}
      >
        <Typo style={styles.text}>
          {!isLoading && isConnected && isAuthenticated
            ? "Getting Started!"
            : !isConnected
              ? "Please Connect to internet!"
              : !isAuthenticated
                ? "Log in"
                : "Authenticating..."}
        </Typo>
        {isLoading && <ActivityIndicator size={20} color={colors.text} />}
      </TouchableOpacity>

      <Typo size={14} color={colors.primary}>
        Version 2.8.1
      </Typo>

      <Typo size={14} color={colors.primary} style={{ marginTop: 5 }}>
        Developed by:{" "}
        <Typo
          style={{
            color: colors.text,
            fontWeight: "800",
            fontSize: 14,
          }}
        >
          Crazy Dev John
        </Typo>
      </Typo>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:colors.
  },
  logo: {
    width: "90%",
    height: ScreenSize.height * 0.7,
    resizeMode: "contain",
  },
  btn: {
    marginBottom: 80,
    width: ScreenSize.width * 0.72,
    height: 60,
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    elevation: 20,
    shadowColor: "#000",
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
});

export default Splash;
