import {StyleSheet, useColorScheme} from "react-native";
import {Redirect, Tabs} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import {usePurchases} from "@/context/PurchasesContext";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from "@/constants/Colors";

const TabLayout = () => {

  const { validated } = usePurchases()

  //if (!validated) return <Redirect href="/subscription" />

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        headerStyle: { backgroundColor:  Colors.dark.background },
        tabBarStyle: {
          backgroundColor: "black",
          height: 30,
          elevation: 10,
          shadowColor: '#000',
          paddingTop: 12,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderTopWidth: 0.5,
          borderTopColor: '#333'
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
            <MaterialCommunityIcons name='database-search' size={28} color={color} />
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