import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/theme";
import { ScreenSize } from "@/utils/styling";
import { Image } from "expo-image";
import { BlurTargetView, BlurView } from "expo-blur";

const Background = () => {
  const blurTargetRef = React.useRef(null);

  return (
    <View style={styles.container}>
      {/* <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} /> */}
      <BlurTargetView ref={blurTargetRef} style={{ flex: 1 }}>
        <Image
          source={require("@/assets/images/1.jpg")}
          style={styles.image}
          blurRadius={1000}
        />
      </BlurTargetView>

      {/* BlurView overlay */}
      <BlurView
        blurTarget={blurTargetRef}
        blurMethod="dimezisBlurView"
        intensity={100}
        style={StyleSheet.absoluteFill}
        tint="dark"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ScreenSize.width,
    height: ScreenSize.height,
    backgroundColor: colors.white,
    position: "absolute",
  },
  circle1: {
    position: "absolute",
    width: ScreenSize.width / 2,
    height: ScreenSize.width / 2,
    backgroundColor: colors.light,
    borderRadius: "50%",
    top: -50,
    left: -50,
    zIndex: 9,
  },
  circle2: {
    position: "absolute",
    width: ScreenSize.height / 2,
    height: ScreenSize.height / 2,
    borderRadius: "50%",
    top: -50,
    left: -50,
    backgroundColor: colors.white,
    zIndex: 8,
  },
  circle3: {
    position: "absolute",
    width: ScreenSize.height / 1.2,
    height: ScreenSize.height / 1.2,
    borderRadius: "50%",
    top: -50,
    left: -50,
    backgroundColor: colors.light,
    zIndex: 7,
  },
  image: {
    width: ScreenSize.width,
    height: ScreenSize.height,
  },
});

export default Background;
