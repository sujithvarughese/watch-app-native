import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="results" options={{ title: "" }} />
      <Stack.Screen name="about" options={{ title: "" }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
