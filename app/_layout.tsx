import { Stack } from "expo-router";
import Index from ".";
import profileInputa from "./profileInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profileInput" options={{ headerShown: false }} />
      <Stack.Screen name="stylistInput" options={{ headerShown: false }} />
      <Stack.Screen name="homePage" options={{ headerShown: false }} />
    </Stack>
  );
}
