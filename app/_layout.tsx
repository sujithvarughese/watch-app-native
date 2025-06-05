import { Stack } from "expo-router";
import {Provider} from "react-redux";
import {useColorScheme} from "react-native";
import {store} from "@/store/store";
import PurchasesProvider from "@/context/PurchasesProvider";

export default function RootLayout() {

  let colorScheme = useColorScheme()

  return (
    <PurchasesProvider>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="results" options={{ title: "", headerStyle: { backgroundColor: '#000' } }} />
          <Stack.Screen name="subscription" options={{ headerShown: false, title: "" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </PurchasesProvider>



  );
}
