import React from "react";
import { View, Text } from "react-native";
import SwipeDeck from "@/components/SwipeDeck";
import { GestureHandlerRootView } from "react-native-gesture-handler";
function swipeDeck() {
  return (
    <GestureHandlerRootView>
      <SwipeDeck></SwipeDeck>
    </GestureHandlerRootView>
  );
}

export default swipeDeck;
