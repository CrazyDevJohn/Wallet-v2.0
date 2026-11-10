import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { colors } from "@/theme";
import { router, useRouter } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Wrapper from "@/components/wrapper";
import { IoniconName } from "@/type";
import useAuth from "@/hooks/useAuth";
import useNetChecker from "@/hooks/useNetChecker";
import useLoader from "@/hooks/useLoader";
import { typeOfSalary } from "@/lib/utils";
import Typo from "@/components/typo";

const CreatePin = () => {
  const router = useRouter();

  const { userId } = useAuth();
  const { isConnected } = useNetChecker();
  const { isLoading, setIsLoading } = useLoader();
  const [category, setCategory] = useState<{
    icon: IoniconName;
    name: string;
  } | null>(null);
  return (
    <Wrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/wallet.png")}
          contentFit="contain"
          style={styles.image}
        />

        <TouchableOpacity disabled={isLoading}>
          <Ionicons name="checkmark-sharp" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.background} />

        <Typo
          size={24}
          color={colors.text}
          style={{ fontWeight: "700", textAlign: "center" }}
        >
          Mark Your Profit
        </Typo>

        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: colors.textLight,
            }}
          >
            <Typo style={styles.amount}>RS</Typo>
            <TextInput
              placeholder={"0"}
              placeholderTextColor={colors.text}
              keyboardType="numeric"
              style={[
                styles.amount,
                {
                  width: "100%",
                },
              ]}
              onChangeText={(text: string) => {
                const parsed = parseFloat(text);
                // setAmount(Number.isNaN(parsed) ? 0 : parsed);
              }}
              // value={amount?.toString()}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: colors.text,
              // paddingHorizontal: 10,
              paddingLeft: 40,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                position: "absolute",
                left: 10,
                borderRightWidth: 1,
                borderRightColor: colors.text,
                width: 28,
              }}
            >
              <Entypo name="new-message" size={18} color={colors.textLight} />
            </View>
            <TextInput
              placeholder={"Nail Removing ..."}
              placeholderTextColor={colors.text}
              style={styles.titleInput}
              // onChangeText={setTitle}
              // value={title}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10,
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={"Boards Count"}
              placeholderTextColor={colors.text}
              style={{
                width: 130,
                height: 40,
                borderColor: colors.text,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                color: colors.text,
              }}
              // onChangeText={setTitle}
              // value={title}
            />
            <Typo color={colors.text}>*</Typo>
            <TextInput
              placeholder={"How Much "}
              placeholderTextColor={colors.text}
              style={{
                width: 130,
                height: 40,
                borderColor: colors.text,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                color: colors.text,
              }}
              // onChangeText={setTitle}
              // value={title}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "baseline",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {typeOfSalary.map((t, i) => {
              return (
                <TouchableOpacity
                  key={t.name}
                  style={[styles.categoryItem]}
                  onPress={() => {
                    // setCategory(c);
                    Keyboard.dismiss();
                  }}
                >
                  <Ionicons
                    name={t.icon as IoniconName}
                    size={18}
                    color={colors.textLight}
                  />
                  <Typo
                    size={18}
                    color={colors.text}
                    style={{ fontWeight: "700" }}
                  >
                    {t.name}
                  </Typo>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

//  id: string;
//   userId: string;
//   amount: number; // calculate total in hire like: Rs. 4500
//   date: string;
//   rawInput: string; // total board count 50 * 75, loading: 1000, works for: 3000
//   description?: string;
//   widthdraw?: number;
//   typeOfSalary:
//     | "Board Breack"
//     | "Nail Remove"
//     | "Company"
//     | "Day"
//     | "Loading"
//     | "Driving"
//     | "all";

export default CreatePin;

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
    height: 30,
    width: 150,
  },
  backBtn: {
    padding: 5,
  },
  card: {
    marginHorizontal: 5,
    marginVertical: 15,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: colors.white,
    // elevation: 5,
    paddingBottom: 20,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    zIndex: -1,
    opacity: 0.6,
    backgroundColor: colors.neutral800,
    elevation: 5,
    shadowColor: colors.light,
  },
  categoryItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.text,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
  },
  amount: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.text,
  },
  titleInput: {
    fontSize: 18,
    color: colors.text,
    height: 40,
    width: "100%",
    backgroundColor: "#0000",
  },
});
