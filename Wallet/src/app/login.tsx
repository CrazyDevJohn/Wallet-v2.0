import Typo from "@/components/typo";
import Wrapper from "@/components/wrapper";
import useAuth from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import { colors } from "@/theme";
import { ScreenSize } from "@/utils/styling";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";

const LogIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { setIsLoading, isLoading } = useLoader();

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      alert("Require all fields!");
      return null;
    }

    setIsLoading(true, "Checking your credentials!");
    const { status, error } = await login(email, password);
    if (status === "ok") {
      Toast.show("Logged in successfully!", 2000);
      setEmail("");
      setPassword("");
      router.replace("/home");
    } else {
      Alert.alert("Login Failed!", "Invalid credentials! " + error);
    }
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={0}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.imageBx}>
          <Image
            source={require("@/assets/images/revenue-i4.png")}
            style={styles.image}
          />
        </View>
        <Typo size={40} style={styles.heading}>
          Welcome Back
        </Typo>

        <View>
          <TextInput
            placeholder="Email Address..."
            placeholderTextColor={colors.textLight}
            onChangeText={setEmail}
            style={styles.input}
            value={email}
          />
          <TextInput
            placeholder="Password..."
            placeholderTextColor={colors.neutral500}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          <TouchableOpacity
            disabled={isLoading}
            style={styles.button}
            onPress={handleSignIn} // remove the comment after creating auth system
            // onPress={() => router.push("/home")}
          >
            <Typo style={styles.buttonText}>Sign In</Typo>
          </TouchableOpacity>
          <Typo
            size={15}
            style={{
              textAlign: "center",
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              color: colors.text,
            }}
          >
            Don&apos;t have an account?{"  "}
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => router.push("/signup")}
            >
              <Typo
                size={15}
                color={colors.text}
                style={{ fontWeight: "700", marginBottom: -4 }}
              >
                Sign Up
              </Typo>
            </TouchableOpacity>
          </Typo>
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  imageBx: {
    height: ScreenSize.height * 0.44,
    marginTop: 10,
    paddingHorizontal: "5%",
  },
  image: {
    width: "100%",
    height: ScreenSize.height * 0.44,
    resizeMode: "contain",
  },
  heading: {
    textAlign: "center",
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 13,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.text,
    color: colors.text,
  },
  button: {
    marginHorizontal: 20,
    height: 50,
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
    fontWeight: "600",
  },
});

export default LogIn;
