import {Redirect} from "expo-router";
import {useEffect, useState} from "react";
import {checkEntitlements, initializeRevenueCat} from "@/utilities/revenuecat";


const Index = () => {

  const [validated, setValidated] = useState(false);

  const validateSubscription = async () => {
    await initializeRevenueCat()
    const customerInfo = await checkEntitlements();
    if (Object.entries(customerInfo.entitlements.active).length) {
      setValidated(true);
    }
  }

  useEffect(() => {
    validateSubscription()
  }, []);

  if (!validated) {
    return <Redirect href="/subscription" />;
  }
  return <Redirect href="/(tabs)" />;
};

export default Index;