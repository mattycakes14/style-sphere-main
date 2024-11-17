import { Text, View } from "react-native";
import Welcome from "@/components/Welcome";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import App from "./app";
export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#eaefee" }}>
      <App></App>
    </GestureHandlerRootView>
  );
}
