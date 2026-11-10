import { TRANSACTION_API } from "@/lib/env.local";
import Typo from "@/components/typo";
import Wrapper from "@/components/wrapper";
import useAuth from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import useNetChecker from "@/hooks/useNetChecker";
import { CATEGORIES, genDate } from "@/lib/utils";
import { colors } from "@/theme";
import { IoniconName } from "@/type";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-simple-toast";

const Create = () => {
  const router = useRouter();

  const { userId } = useAuth();
  const { isConnected } = useNetChecker();
  const { isLoading, setIsLoading } = useLoader();
  const [category, setCategory] = useState<{
    icon: IoniconName;
    name: string;
  } | null>(null);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [isIncome, setIsIncome] = useState(false);

  const { formattedMonth, formattedDay, year } = genDate();

  const handleCreation = async () => {
    Keyboard.dismiss();
    if (!title || amount <= 0 || !category) {
      alert("Require all fields!");
      return null;
    }

    if (!isConnected) {
      Toast.show("No internet connection", 3000);
      return;
    }

    setIsLoading(true, "Creating a transaction!");

    try {
      const increment = isIncome ? amount : -amount;

      const response = await axios.post(`${TRANSACTION_API}/create`, {
        userId,
        amount: increment,
        category: category.name,
        title,
        date: `${year}-${formattedMonth}-${formattedDay}`,
      });

      if (response.status !== 201) {
        return Toast.show(
          "Error creating transaction. Please try again.",
          3000,
        );
      }

      setIsIncome(false);
      setTitle("");
      setAmount(0);
      setCategory(null);
      Toast.show("Transaction Created...", 3000);
      router.back();
    } catch (error) {
      Toast.show("Error creating transaction. Please try again.", 3000);
      console.error("Error creating transaction: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/wallet.png")}
          style={styles.image}
        />

        <TouchableOpacity disabled={isLoading} onPress={handleCreation}>
          <Ionicons name="checkmark-sharp" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.background} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: isIncome ? "#0000" : colors.primary,
              },
            ]}
            onPress={() => {
              setIsIncome(false);
              Keyboard.dismiss();
            }}
          >
            <Ionicons
              name="arrow-down-circle"
              color={colors.expense}
              size={18}
            />
            <Typo
              size={20}
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: !isIncome ? colors.white : colors.text,
              }}
            >
              Expenses
            </Typo>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: !isIncome ? "#0000" : colors.primary,
              },
            ]}
            onPress={() => {
              setIsIncome(true);
              Keyboard.dismiss();
            }}
          >
            <Ionicons name="arrow-up-circle" color={colors.income} size={18} />
            <Typo
              size={20}
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: isIncome ? colors.white : colors.text,
              }}
            >
              Income
            </Typo>
          </TouchableOpacity>
        </View>

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
              setAmount(Number.isNaN(parsed) ? 0 : parsed);
            }}
            value={amount?.toString()}
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
            placeholder={"Transportation Fee."}
            placeholderTextColor={colors.text}
            style={styles.titleInput}
            onChangeText={setTitle}
            value={title}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 15,
            }}
          >
            <Ionicons name="pricetag-outline" size={22} color={colors.text} />
            <Typo style={styles.amount}>Category</Typo>
          </View>

          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {CATEGORIES.map((c, i) => (
              <TouchableOpacity
                key={c.name}
                style={[
                  styles.categoryItem,
                  {
                    ...(category === c && {
                      backgroundColor: colors.text,
                    }),
                  },
                ]}
                onPress={() => {
                  setCategory(c);
                  Keyboard.dismiss();
                }}
              >
                <Ionicons
                  name={c.icon}
                  size={12}
                  color={
                    c.name === "Income"
                      ? colors.income
                      : category === c
                        ? colors.white
                        : colors.text
                  }
                />
                <Typo
                  size={18}
                  color={category === c ? colors.white : colors.text}
                  style={{ fontWeight: "700" }}
                >
                  {c.name}
                </Typo>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    height: 30,
    width: 150,
    resizeMode: "contain",
  },
  backBtn: {
    padding: 5,
  },
  card: {
    marginHorizontal: 5,
    marginVertical: 15,
    paddingVertical: 25,
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
    opacity: 0.7,
    backgroundColor: colors.neutral800,
    elevation: 5,
    shadowColor: colors.light,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "47%",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
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
  categoryItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    fontSize: 12,
    borderColor: colors.text,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
  },
});

export default Create;
