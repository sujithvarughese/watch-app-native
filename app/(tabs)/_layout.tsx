import {StyleSheet, useColorScheme, View} from "react-native";
import {Redirect, Tabs} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {usePurchases} from "@/context/PurchasesContext";
import {useEffect} from "react";

const TabLayout = () => {

  const colorScheme = useColorScheme()
  const { validated } = usePurchases()

  useEffect(() => {
    console.log(validated)
  }, [validated]);

  if (!validated) return <Redirect href="/subscription" />


  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        headerStyle: { backgroundColor: "#25292e"},
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? "black" : "white",
          height: 70,
          elevation: 10,
          shadowColor: '#000',
          paddingTop: 6,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderTopWidth: 0.5,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#e5e5e5',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={28} />
          )
      }}
      />
      <Tabs.Screen
        name="research"
        options={{
          title: '',
          tabBarIcon: ({ color, focused}) => (
            <MaterialIcons name="library-books" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '',
          tabBarIcon: ({ color, focused}) => (
            <Entypo name="info-with-circle" size={28} color={color} />
          )
      }}
      />
    </Tabs>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabLayout;