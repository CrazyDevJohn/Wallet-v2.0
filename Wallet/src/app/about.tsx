import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScreenSize } from "@/utils/styling";
import { colors } from "@/theme";
import Typo from "@/components/typo";
import Wrapper from "@/components/wrapper";

const socialLinks = [
  {
    link: "https://youtube.com/@crazydeviljohn",
    icon: "logo-youtube",
  },
  {
    link: "https://github.com/CrazyDevJohn",
    icon: "logo-github",
  },
  {
    link: "https://crazydevjohnweb.web.app",
    icon: "logo-chrome",
  },
] as { link: string; icon: IconNameType }[];

type IconNameType = keyof typeof Ionicons.glyphMap;

const About = () => {
  const router = useRouter();

  return (
    <Wrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{}} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: ScreenSize.width,
          height: ScreenSize.width - 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/cdj.png")}
          style={styles.image}
        />
      </View>

      <Typo style={styles.name}>Crazy Dev John</Typo>
      <Typo style={styles.dev}>Full-Stack Developer & Ethical Hacker</Typo>

      <View style={styles.social}>
        {socialLinks.map(({ link, icon }) => (
          <View
            key={icon}
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 15,
              backgroundColor: colors.white,
              padding: 8,
              elevation: 8,
              borderRadius: 10,
            }}
          >
            <Ionicons name={icon} size={24} color={colors.text} />
            <View style={styles.separator} />
            <Typo style={styles.links}>{link}</Typo>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
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
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: ScreenSize.width * 0.72,
    height: ScreenSize.width * 0.72,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  dev: {
    fontSize: 15,
    textAlign: "center",
  },
  social: {
    marginTop: 25,
    gap: 15,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  separator: {
    width: 1,
    height: "70%",
    backgroundColor: colors.primary,
  },
  links: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  footer: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default About;
