import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseType {
  message: string;
  user: User;
  token: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  date: string;
  description?: string;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export interface Transaction {
  amount: number;
  category: { icon: string; name: string };
  date: string;
  id: string;
  isIncome: boolean;
  title: string;
  userId: string;
  deleteMe: string;
}

export interface TransactionProps {
  transactions: Transaction[];
  isLoading: boolean;
  loadData: () => {};
  setIsLoading: (value: boolean, text?: string) => void;
}

export type IoniconName = ComponentProps<typeof Ionicons>["name"];

export interface Pin {
  id: string;
  userId: string;
  amount: number; // calculate total in hire like: Rs. 4500
  date: string;
  rawInput: string; // total board count 50 * 75, loading: 1000, works for: 3000
  description?: string;
  widthdraw?: number;
  typeOfSalary:
    | "Board Breack"
    | "Nail Remove"
    | "Company"
    | "Day"
    | "Loading"
    | "Driving"
    | "all";
}
