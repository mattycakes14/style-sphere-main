import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import Profile from "@/components/Profile";

function profileInput() {
  return (
    <GestureHandlerRootView>
      <Profile></Profile>
    </GestureHandlerRootView>
  );
}
export default profileInput;
