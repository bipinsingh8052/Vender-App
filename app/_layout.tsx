import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
        headerShown: false,  // Hides the header for all screens
      }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="taxPage"/>
  </Stack>;
}
