import useLoader from "@/hooks/useLoader";
import { colors } from "@/theme";
import { ScreenSize } from "@/utils/styling";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./typo";

const Loader = () => {
  const { isLoading, loadingMessage } = useLoader();

  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LottieView
          source={require("@/assets/images/51-preloader.json")}
          autoPlay
          loop
          style={styles.loader}
        />
        <Typo style={styles.text}>{loadingMessage || "Please wait!"}</Typo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#0008",
    width: ScreenSize.width,
    height: ScreenSize.height,
  },
  card: {
    width: ScreenSize.width * 0.72,
    height: ScreenSize.width * 0.72,
    borderRadius: 20,
    shadowColor: colors.neutral800,
    elevation: 10,
    backgroundColor: colors.neutral800,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: { width: "100%", height: "70%" },
  text: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "700",
    marginBottom: 40,
  },
});

export default Loader;
