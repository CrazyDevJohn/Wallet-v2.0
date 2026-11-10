// lib/utils.js

import { IoniconName } from "@/type";

export function formatDate(dateString: string) {
  // format date nicely
  // example: from this 👉 2025-05-20 to this 👉 May 20, 2025
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const genDate = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  const formattedMonth = `${year}-${month}`;
  const formattedDay = `${year}-${month}-${day}`;

  return {
    formattedDay,
    formattedMonth,
    year,
  };
};

export const CATEGORIES: { icon: IoniconName; name: string }[] = [
  { icon: "fast-food", name: "Food & Drink" },
  { icon: "cart", name: "Shopping" },
  { icon: "bus", name: "Transportation" },
  { icon: "receipt", name: "Bills" },
  { icon: "cash", name: "Income" },
  { icon: "ellipsis-horizontal", name: "Other" },
];

export const typeOfSalary = [
  { name: "Board Breack", icon: "shield-half" },
  { name: "Nail Remove", icon: "hammer" },
  { name: "Company", icon: "business" },
  { name: "Day", icon: "stopwatch" },
  { name: "Loading", icon: "build" },
  { name: "Driving", icon: "trail-sign" },
  { name: "all", icon: "wallet" },
];
