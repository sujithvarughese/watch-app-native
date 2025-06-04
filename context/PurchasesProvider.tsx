// context/PurchasesProvider.tsx
import React, { useEffect, useState } from "react";
import { PurchasesContext } from "./PurchasesContext";
import Purchases, {
  CustomerInfo,
  LOG_LEVEL, PurchasesConfiguration,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { Platform } from "react-native";

type PurchasesProviderProps = {
  children: React.ReactNode;
};

const IOS_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;

const PurchasesProvider: React.FC<PurchasesProviderProps> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [validated, setValidated] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();

  const initializeRevenueCat = async () => {
    try {
      const configuration: PurchasesConfiguration = {
        apiKey: IOS_API_KEY ?? "",
      };
      if (Platform.OS === 'web') {
        configuration.useAmazon = true;
      }
      await Purchases.configure(configuration);
    } catch (error) {
      console.error('Error initializing RevenueCat:', error);
      throw error;
    }
    if (__DEV__) {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    }
    // Add a listener to update the customerInfo state when the customer info changes, like when a user subscribes
    Purchases.addCustomerInfoUpdateListener((customerInfo) => {
      setCustomerInfo(customerInfo);
    });
    await getOfferings()
    setInitialized(true);
  };

  const getOfferings = async (): Promise<PurchasesOffering> => {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    setOffering(currentOffering);
    // Return the current offering (may be null, so handle accordingly elsewhere if needed)
    return currentOffering as PurchasesOffering;
  };

  /**
   * @param purchasedPackage The package to purchase
   * @returns The result of the purchase
   */
  const purchasePackage = async (purchasedPackage: PurchasesPackage) => {
    try {
      const result = await Purchases.purchasePackage(purchasedPackage);
      setCustomerInfo(result.customerInfo);
      console.log(result.customerInfo);
      return result;
    } catch (error) {
      console.error('Error purchasing package:', error);
      throw error;
    }
  };

  const restorePurchases = async () => {
    try {
      const result = await Purchases.restorePurchases();
      console.log(result)
      setCustomerInfo(result);
    } catch (error) {
      console.error('Error restoring purchases:', error);
      throw error;
    }
  };

  // Fetch the customer info from RevenueCat
  const getCustomerInfo = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log("customer info:", customerInfo)
    setCustomerInfo(customerInfo);
  };

  /**
   * Check if the user is subscribed to any offering
   * @returns True if the user is subscribed to any offering
   */
  const validateUser = async () => {
    if (!initialized || !customerInfo) return;
    const isPro = customerInfo.activeSubscriptions.length > 0;
    setValidated(isPro);
  };

  useEffect(() => {
    initializeRevenueCat();
    getCustomerInfo();
  }, []);

  useEffect(() => {
    // Check if the user is subscribed to any offering after the customer info changes
    validateUser();
  }, [initialized, customerInfo]);

  // If the Purchases SDK is not initialized, return null
  if (!initialized) {
    return null;
  }

  return (
    <PurchasesContext.Provider
      value={{
        currentOffering: offering,
        purchasePackage,
        customerInfo,
        getOfferings,
        validated
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};

export default PurchasesProvider;
