import Typo from "@/components/typo";
import Wrapper from "@/components/wrapper";
import { db } from "@/config/firebase-config";
import useAuth from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import useNetChecker from "@/hooks/useNetChecker";
import { CATEGORIES, genDate } from "@/lib/utils";
import { colors } from "@/theme";
import { IoniconName } from "@/type";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
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

      const docRef = await addDoc(
        collection(
          db,
          `transactions/${userId}/${year}/${formattedMonth}/${formattedDay}`
        ),
        {
          amount: increment,
          category: category,
          title: title,
          date: new Date().toISOString(),
          userId: userId,
          isIncome: isIncome,
          deleteMe: "",
        }
      );

      await updateDoc(docRef, {
        id: docRef.id,
        deleteMe: `transactions/${userId}/${year}/${formattedMonth}/${formattedDay}/${docRef.id}`,
      });

      const summerDocRef = doc(db, "wallets", userId || "");
      const summeryDoc = await getDoc(summerDocRef);
      await updateDoc(summerDocRef, {
        balance:
          (summeryDoc.data()?.balance || 0) + (isIncome ? amount : -amount),
        income: isIncome
          ? (summeryDoc.data()?.income || 0) + amount
          : summeryDoc.data()?.income || 0,
        expense: !isIncome
          ? (summeryDoc.data()?.expense || 0) - amount
          : summeryDoc.data()?.expense || 0,
      });

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
            borderBottomColor: colors.neutral300,
          }}
        >
          <Typo style={styles.amount}>RS</Typo>
          <TextInput
            placeholder={"00.00"}
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
            borderColor: colors.neutral300,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Entypo name="new-message" size={18} color={colors.neutral400} />
          <TextInput
            placeholder={"Transportation Fee."}
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
                  size={18}
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 5,
    paddingBottom: 20,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "47%",
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: 20,
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
    borderColor: colors.neutral400,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
  },
});

export default Create;
