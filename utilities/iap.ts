import {
  initConnection,
  getProducts,
  getPurchaseHistory,
  getAvailablePurchases, requestPurchase
} from 'expo-iap';
import {Product, Purchase, SubscriptionPurchase} from "expo-iap/build/ExpoIap.types";


// Product IDs for subscriptions
const subscriptionSkus = {
  MONTHLY: 'monthly_subscription',
  YEARLY: 'yearly_subscription',
};

// Initialize IAP connection
export const initIAP = async () => {
  try {
    const result = await initConnection();
    if (!result) {
      throw new Error('Failed to initialize IAP connection');
    }
    return result;
  } catch (err) {
    console.error('Error initializing IAP:', err);
    throw err;
  }
};

// Get available subscriptions
export const getSubscriptions = async (): Promise<Product[]> => {
  try {
    const items = await getProducts([subscriptionSkus.MONTHLY, subscriptionSkus.YEARLY]);
    return items;
  } catch (err) {
    console.error('Error fetching subscriptions:', err);
    throw err;
  }
};

// Purchase subscription
export const purchaseSubscription = async (sku: string): Promise<void> => {
  console.log(sku)
  try {
    const result = await requestPurchase({ request: { sku: sku }});
    if (!result) {
      throw new Error('Purchase failed');
    }
  } catch (err) {
    console.error('Error purchasing subscription:', err);
    throw err;
  }
};

// Get current active purchases
export const getCurrentPurchases = async (): Promise<Purchase[]> => {
  try {
    const purchases = await getAvailablePurchases();
    return purchases;
  } catch (err) {
    console.error('Error getting current purchases:', err);
    throw err;
  }
};

// Validate purchase
export const validatePurchase = async (purchase: SubscriptionPurchase): Promise<boolean> => {
  try {
    if (!purchase) return false;

    // Check if purchase is valid and not expired
    const currentTime = Date.now();
    const purchaseTime = purchase.transactionDate;

    // For subscriptions, check if still valid (not expired)
    if (purchase.id === subscriptionSkus.MONTHLY) {
      return (currentTime - purchaseTime) < 30 * 24 * 60 * 60 * 1000; // 30 days
    } else if (purchase.id === subscriptionSkus.YEARLY) {
      return (currentTime - purchaseTime) < 365 * 24 * 60 * 60 * 1000; // 365 days
    }

    return false;
  } catch (err) {
    console.error('Error validating purchase:', err);
    return false;
  }
};

// Get purchase history
export const getPurchaseHistoryList = async (): Promise<Purchase[]> => {
  try {
    const history = await getPurchaseHistory();
    return history;
  } catch (err) {
    console.error('Error getting purchase history:', err);
    throw err;
  }
};