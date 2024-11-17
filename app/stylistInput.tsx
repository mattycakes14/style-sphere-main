import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Stylist from "@/components/Stylist";
function stylistInput() {
  return (
    <GestureHandlerRootView>
      <Stylist></Stylist>
    </GestureHandlerRootView>
  );
}

export default stylistInput;
