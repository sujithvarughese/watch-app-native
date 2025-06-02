import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesConfiguration,
} from 'react-native-purchases';
import Package from 'react-native-purchases';
import {Platform} from 'react-native';

const API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_KEY;

export const initializeRevenueCat = async (): Promise<void> => {
  try {
    const configuration: PurchasesConfiguration = {
      apiKey: API_KEY ?? "",
    };

    if (Platform.OS === 'web') {
      configuration.useAmazon = true;
    }

    await Purchases.configure(configuration);
  } catch (error) {
    console.error('Error initializing RevenueCat:', error);
    throw error;
  }
};

export const checkEntitlements = async (): Promise<CustomerInfo> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (error) {
    console.error('Error checking entitlements:', error);
    throw error;
  }
};

export const getPackages = async (): Promise<Package[]> => {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages ?? [];
  } catch (error) {
    console.error('Error getting packages:', error);
    throw error;
  }
};

export const purchasePackage = async (pack: Package): Promise<CustomerInfo> => {
  try {
    const {customerInfo} = await Purchases.purchasePackage(pack);
    return customerInfo;
  } catch (error) {
    console.error('Error purchasing package:', error);
    throw error;
  }
};

export const restorePurchases = async (): Promise<CustomerInfo> => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    throw error;
  }
};