import Typo from "@/components/typo";
import { formatDate } from "@/lib/utils";
import { colors } from "@/theme";
import { TransactionProps } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-simple-toast";

const Transactions = ({
  transactions,
  isLoading,
  loadData,
  setIsLoading,
}: TransactionProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const deleteTransaction = async (deleteMe: string) => {
    setIsLoading(true);
    try {
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Toast.show("Error deleting transaction", 3000);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(_, i) => _.title + _.id + i.toString()}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoTransactions isLoading={isLoading} />}
          contentContainerStyle={{
            paddingBottom: 73,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => {
            const isIncome = item.amount > 0;
            const iconName = (item.category.icon || "pricetag-outline") as any;
            return (
              <View style={styles.container}>
                <View style={styles.background} />
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={iconName}
                    size={22}
                    color={isIncome ? colors.income : colors.expense}
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
                      size={18}
                      style={{
                        fontWeight: "700",
                        textTransform: "capitalize",
                        color: colors.textLight,
                      }}
                    >
                      {item.title.length > 12
                        ? item.title.substring(0, 12) + "..."
                        : item.title}
                    </Typo>
                    <Typo
                      size={12}
                      style={{
                        fontWeight: "600",
                        textTransform: "capitalize",
                        color: colors.neutral400,
                      }}
                    >
                      {item.category.name}
                    </Typo>
                  </View>
                  <View>
                    <Typo
                      size={18}
                      style={{
                        fontWeight: "700",
                        textTransform: "capitalize",
                        color: isIncome ? colors.income : colors.expense,
                      }}
                    >
                      {item.amount}
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
                  onPress={() => deleteTransaction(item.deleteMe)}
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
      )}
    </View>
  );
};

const NoTransactions = ({ isLoading }: { isLoading: boolean }) => {
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    // backgroundColor: colors.white,
    // elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    zIndex: -1,
    opacity: 0.5,
    backgroundColor: colors.neutral800,
    elevation: 5,
    shadowColor: colors.light,
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
});

export default Transactions;
