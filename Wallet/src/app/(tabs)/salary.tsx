import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Wrapper from "@/components/wrapper";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { Image } from "expo-image";
import Typo from "@/components/typo";
import { ScreenSize } from "@/utils/styling";
import Transactions from "@/components/transactions";
import useAuth from "@/hooks/useAuth";
import { formatDate, genDate } from "@/lib/utils";
import useLoader from "@/hooks/useLoader";
import { Pin, Transaction } from "@/type";
import Header from "@/components/header";
import { useRouter } from "expo-router";

const dummyPins: Pin[] = [
  {
    id: "1",
    userId: "1",
    amount: 4500,
    date: new Date().toISOString(),
    rawInput: "total board count 50 * 75, loading: 1000, works for: 3000",
    description: "Today is a working day!",
    widthdraw: 100,
    typeOfSalary: "Nail Remove",
  },
  {
    id: "2",
    userId: "2",
    amount: 4500,
    date: new Date().toISOString(),
    rawInput: "total board count 50 * 75, loading: 1000, works for: 3000",
    description: "Today is a working day!",
    typeOfSalary: "Nail Remove",
  },
  {
    id: "3",
    userId: "3",
    amount: 4500,
    date: new Date().toISOString(),
    rawInput: "total board count 50 * 75, loading: 1000, works for: 3000",
    description: "Today is a working day!",

    typeOfSalary: "Loading",
  },
  {
    id: "3",
    userId: "3",
    amount: 4500,
    date: new Date().toISOString(),
    rawInput: "total board count 50 * 75, loading: 1000, works for: 3000",
    description: "Today is a working day!",

    typeOfSalary: "Nail Remove",
  },
  {
    id: "4",
    userId: "4",
    amount: 4500,
    date: new Date().toISOString(),
    rawInput: "total board count 50 * 75, loading: 1000, works for: 3000",
    description: "Today is a working day!",
    widthdraw: 1000,

    typeOfSalary: "Board Breack",
  },
  {
    id: "5",
    userId: "5",
    amount: 4500,
    date: new Date().toISOString(),
    rawInput: "total board count 50 * 75, loading: 1000, works for: 3000",
    description: "Today is a working day!",
    typeOfSalary: "Driving",
  },
];

const Salary = () => {
  const { userId } = useAuth();

  const { formattedMonth, formattedDay, year } = genDate();

  const { isLoading, setIsLoading } = useLoader();
  const [pins, setPins] = useState<Pin[]>(dummyPins);
  const [summery, setSummery] = useState({
    balance: "0.00",
    income: "0.00",
    expense: "0.00",
  });

  const loadData = useCallback(async () => {
    setIsLoading(true, "Loading your transactions!");
    try {
      // await Promise.all([getTransactions(), getSummery()]);
    } catch (error) {
      console.log("error in fetching data ", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  return (
    <Wrapper
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <Header screenName="salary" />

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
                {/* total incomes of this month */}
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
                {/* total expenses of this month */}
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

      <Typo style={styles.text}>Day's Of This Month</Typo>

      <RenderPins
        pins={pins}
        isLoading={isLoading}
        loadData={() => ({})}
        setIsLoading={setIsLoading}
      />
    </Wrapper>
  );
};

const RenderPins = ({
  pins,
  isLoading,
  loadData,
}: {
  pins: Pin[];
  isLoading: boolean;
  loadData: () => {};
  setIsLoading: (value: boolean, text?: string) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
      }}
    >
      <FlatList
        data={pins}
        keyExtractor={(_, i) => i.toString() + _.id}
        ListEmptyComponent={<NoPins isLoading={isLoading} />}
        contentContainerStyle={{
          paddingBottom: 73,
        }}
        renderItem={({ item, index }) => {
          console.log(item);
          return (
            <View style={styles.pinContainer}>
              <View style={styles.background} />
              <View style={styles.iconContainer}>
                <Ionicons
                  name={"receipt"}
                  size={22}
                  color={true ? colors.income : colors.expense}
                />
              </View>
              <View
                style={{
                  marginHorizontal: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "70%",
                }}
              >
                <View>
                  <Typo
                    size={15}
                    style={{
                      fontWeight: "700",
                      textTransform: "capitalize",
                      color: colors.textLight,
                    }}
                  >
                    {item.typeOfSalary}
                    {/* 
                    
 id: "5",
    userId: "5",
    amount: 4500,
    date: new Date().toISOString(),
    rawInput: "total board count 50 * 75, loading: 1000, works for: 3000",
    typeOfSalar: "board" | "compeny" | "Day" | "Loading" | "all"
    description: "Today is a working day!",

                    */}
                  </Typo>
                  <Typo
                    size={12}
                    style={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      color: colors.income,
                    }}
                  >
                    RS. {item.widthdraw || "0"}
                  </Typo>
                </View>
                <View>
                  <Typo
                    size={14}
                    style={{
                      fontWeight: "700",
                      textTransform: "capitalize",
                      color: colors.expense,
                    }}
                  >
                    RS. {item.amount || "0"}
                  </Typo>
                  <Typo
                    size={12}
                    style={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      color: colors.neutral400,
                    }}
                  >
                    {formatDate(item.date)}
                  </Typo>
                </View>
              </View>
              <TouchableOpacity
                disabled={isLoading}
                style={styles.trashBtn}
                // onPress={() => deleteTransaction(item.deleteMe)}
                activeOpacity={0.9}
              >
                <Ionicons
                  name="trash-outline"
                  size={25}
                  color={colors.expense}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const NoPins = ({ isLoading }: { isLoading: boolean }) => {
  const router = useRouter();

  return (
    <View style={styles.noTransaction}>
      <View style={styles.background} />
      <Ionicons name="receipt-outline" size={100} color={colors.primary} />
      <Typo
        style={{
          fontSize: 20,
          color: colors.text,
          fontWeight: "700",
        }}
      >
        No transactions yet
      </Typo>
      <Typo
        style={{
          fontSize: 12,
          color: colors.neutral500,
          fontWeight: "700",
          textAlign: "center",
          padding: 5,
        }}
      >
        Start tracking your finances by adding your first transaction
      </Typo>

      <TouchableOpacity
        disabled={isLoading}
        style={styles.button}
        onPress={() => router.push("/create")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={20} color={"#fff"} />
        <Typo size={12} color="#fff">
          Add Transaction
        </Typo>
      </TouchableOpacity>
    </View>
  );
};

export default Salary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
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
  pinContainer: {
    marginHorizontal: 25,

    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
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
  noTransaction: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    // elevation: 8,
    shadowColor: colors.shadow,
    padding: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    borderRadius: 30,
  },
  iconContainer: {
    // backgroundColor: colors.neutral200,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  trashBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderLeftWidth: 1,
    borderLeftColor: colors.neutral400,
  },
});
