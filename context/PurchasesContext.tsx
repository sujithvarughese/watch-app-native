// context/PurchasesContext.tsx
import {createContext, useContext} from "react";
import {
  CustomerInfo,
  MakePurchaseResult,
  PurchasesOffering,
  PurchasesPackage,
  PurchasesStoreTransaction,
} from "react-native-purchases";

export type PurchasesContextProps = {
  currentOffering: PurchasesOffering | null;
  purchasePackage: (
    packageToPurchase: PurchasesPackage
  ) => Promise<MakePurchaseResult>;
  restorePurchases: () => Promise<CustomerInfo>;
  customerInfo?: CustomerInfo;
  getOfferings: () => Promise<PurchasesOffering>;
  validated: boolean;
};

const PurchasesContext = createContext<PurchasesContextProps | null>(null);
const usePurchases = () => useContext(PurchasesContext as React.Context<PurchasesContextProps>)

export { PurchasesContext, usePurchases };
