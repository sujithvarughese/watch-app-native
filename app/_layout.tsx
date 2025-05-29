import { Stack } from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {SafeAreaView} from "react-native";
import {store} from "@/store/store";
import {useColorScheme} from "@/hooks/useColorScheme";

export default function RootLayout() {

  let colorScheme = useColorScheme()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
        <Provider store={store}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: "" }} />
            <Stack.Screen name="results" options={{ title: "" }} />
            <Stack.Screen name="about" options={{ title: "" }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}
