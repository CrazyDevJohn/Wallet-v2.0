import React from "react";
import { StatusBar, View, type ViewStyle } from "react-native";
// import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Background from "./background";

interface WrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noBg?: boolean;
}

const Wrapper = ({ children, style, noBg = false }: WrapperProps) => {
  return (
    <View style={[style, { paddingTop: StatusBar?.currentHeight || 42 }]}>
      {!noBg && <Background />}
      <View style={{ zIndex: 111 }}>{children}</View>
    </View>
  );
};

export default Wrapper;
