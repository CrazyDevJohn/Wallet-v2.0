import { colors } from "@/theme";
import React from "react";
import { Text, TextStyle } from "react-native";

interface TypoProps {
  children: React.ReactNode | string;
  color?: string;
  size?: number;
  style?: TextStyle;
}

const Typo = ({ children, color, size, style }: TypoProps) => {
  return (
    <Text
      style={{
        color: color || colors.neutral800,
        fontSize: size || 22,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export default Typo;
