import Header from "@/components/header";
import Transactions from "@/components/transactions";
import Typo from "@/components/typo";
import Wrapper from "@/components/wrapper";
import useAuth from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import { TRANSACTION_API } from "@/lib/env.local";
import { genDate } from "@/lib/utils";
import { colors } from "@/theme";
import { Transaction } from "@/type";
import { ScreenSize } from "@/utils/styling";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// const dummeyTrans: Transaction[] = [
//   {
//     amount: 100,
//     category: { icon: "fast-food", name: "Food & Drink" },
//     date: new Date().toISOString(),
//     id: "1",
//     isIncome: true,
//     title: "bus Fee",
//     userId: "1",
//     deleteMe: "Buss Fee",
//   },
//   {
//     amount: 100,
//     category: { icon: "fast-food", name: "Food & Drink" },
//     date: new Date().toISOString(),
//     id: "1",
//     isIncome: true,
//     title: "bus Fee",
//     userId: "1",
//     deleteMe: "Buss Fee",
//   },
//   {
//     amount: 100,
//     category: { icon: "fast-food", name: "Food & Drink" },
//     date: new Date().toISOString(),
//     id: "1",
//     isIncome: true,
//     title: "bus Fee",
//     userId: "1",
//     deleteMe: "Buss Fee",
//   },
//   {
//     amount: 100,
//     category: { icon: "fast-food", name: "Food & Drink" },
//     date: new Date().toISOString(),
//     id: "1",
//     isIncome: true,
//     title: "bus Fee",
//     userId: "1",
//     deleteMe: "Buss Fee",
//   },
//   {
//     amount: 100,
//     category: { icon: "fast-food", name: "Food & Drink" },
//     date: new Date().toISOString(),
//     id: "1",
//     isIncome: true,
//     title: "bus Fee",
//     userId: "1",
//     deleteMe: "Buss Fee",
//   },
//   {
//     amount: 100,
//     category: { icon: "fast-food", name: "Food & Drink" },
//     date: new Date().toISOString(),
//     id: "1",
//     isIncome: true,
//     title: "bus Fee",
//     userId: "1",
//     deleteMe: "Buss Fee",
//   },
//   {
//     amount: 100,
//     category: { icon: "fast-food", name: "Food & Drink" },
//     date: new Date().toISOString(),
//     id: "1",
//     isIncome: true,
//     title: "bus Fee",
//     userId: "1",
//     deleteMe: "Buss Fee",
//   },
// ];

const Home = () => {
  const { userId, token } = useAuth();

  const { formattedMonth, formattedDay, year } = genDate();

  const { isLoading, setIsLoading } = useLoader();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summery, setSummery] = useState({
    balance: "",
    income: "",
    expense: "",
  });

  const getSummery = useCallback(async () => {
    if (!userId) return;
    const response = await axios.get(`${TRANSACTION_API}/summery/${userId}`, {
      headers: { token: `Bearer ${token}` },
    });
    setSummery(response.data);
  }, [userId, token]);

  const getTransactions = useCallback(async () => {
    const response = await axios.get(`${TRANSACTION_API}/${userId}/`, {
      headers: { token: `Bearer ${token}` },
    });

    setTransactions(response.data.transactions);
  }, [userId, formattedDay, formattedMonth, year, token]);

  const loadData = useCallback(async () => {
    setIsLoading(true, "Loading your transactions!");
    try {
      await Promise.all([getTransactions(), getSummery()]);
    } catch (error) {
      console.log("error in fetching data ", error);
    } finally {
      setIsLoading(false);
    }
  }, [getSummery, getTransactions, setIsLoading]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Wrapper
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <Header />

      <View style={styles.card}>
        <View style={styles.background} />
        <View style={{ flex: 1 }}>
          <Typo size={18} color={colors.textLight}>
            Total Balance
          </Typo>
          <Typo size={35} style={{ fontWeight: "700", color: colors.text }}>
            RS. {summery.balance ? summery.balance : "0.00"}
          </Typo>
        </View>

        <View style={styles.INE}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons
                name="arrow-up-circle"
                color={colors.income}
                size={12}
              />
              <Typo
                size={12}
                color={colors.textLight}
                style={{ textAlign: "center" }}
              >
                Income
              </Typo>
            </View>
            <Typo size={18} style={{ fontWeight: "700", color: colors.income }}>
              RS. {summery.income ? summery.income : "0.00"}
            </Typo>
          </View>
          <View style={styles.separator} />
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons
                name="arrow-down-circle"
                color={colors.expense}
                size={12}
              />
              <Typo
                size={12}
                color={colors.textLight}
                style={{ textAlign: "center" }}
              >
                Expenses
              </Typo>
            </View>
            <Typo
              size={18}
              style={{ fontWeight: "700", color: colors.expense }}
            >
              RS. {summery.expense ? summery.expense : "0.00"}
            </Typo>
          </View>
        </View>
      </View>

      {/* transactions */}

      <Typo style={styles.text}>Recent Transactions.</Typo>

      <Transactions
        transactions={transactions}
        isLoading={isLoading}
        loadData={loadData}
        setIsLoading={setIsLoading}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    width: ScreenSize.width - 50,
    marginHorizontal: "auto",
    height: 180,

    // elevation: 5,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    zIndex: -1,
    opacity: 0.7,
    backgroundColor: colors.neutral800,
    elevation: 5,
    shadowColor: colors.light,
  },
  INE: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: colors.textLight,
    opacity: 0.5,
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    marginHorizontal: 25,
    paddingBottom: 10,
    fontWeight: "600",
    borderBottomColor: colors.textLight,
    borderBottomWidth: 1,
    color: colors.text,
  },
});

export default Home;
