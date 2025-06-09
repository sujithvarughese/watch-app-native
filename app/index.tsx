import React from 'react';
import {usePurchases} from "@/context/PurchasesContext";
import {Redirect} from "expo-router";

const Index = () => {

  const { validated } = usePurchases()
  if (!validated) return <Redirect href="/subscription" />
  return <Redirect href="/(tabs)" />
};

export default Index;