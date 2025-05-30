import { Stack } from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {SafeAreaView, useColorScheme} from "react-native";
import {store} from "@/store/store";

export default function RootLayout() {

  let colorScheme = useColorScheme()

  return (

      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="results" options={{ title: "" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>


  );
}
