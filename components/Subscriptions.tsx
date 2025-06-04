import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions, Alert
} from 'react-native';
import {BlurView} from 'expo-blur';
import {usePurchases} from "@/context/PurchasesContext";
import {PurchasesPackage} from "react-native-purchases";
import * as Haptics from "expo-haptics";
import {restorePurchases} from "@/utilities/revenuecat";

export const SubscriptionModal = () => {
  const { validated, currentOffering, purchasePackage } = usePurchases()
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const offerings = currentOffering?.availablePackages
    setPackages(offerings ?? [])
  }, []);

  const handleSubscribe = async (pkg: PurchasesPackage) => {
    setLoading(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (!pkg) {
        throw new Error("No subscription package selected.");
      }
      await purchasePackage(pkg);
      Alert.alert("Success", "Subscription successful!");
    } catch (error) {
      Alert.alert("Error", "Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const purchases = await restorePurchases();
      if (purchases) {
        Alert.alert("Success", "Purchases restored successfully!");
      } else {
        Alert.alert("Info", "No purchases to restore");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to restore purchases");
    } finally {
      setRestoring(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!validated}
      onRequestClose={() => setIsVisible(false)}
    >
      <BlurView intensity={70} style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>Select the plan that works best for you</Text>

          <TouchableOpacity
            style={styles.planButton}
            onPress={() => handleSubscribe(packages[0])}
            disabled={loading}
          >
            <Text style={styles.planTitle}>{packages[0]?.product.title}</Text>
            <Text style={styles.price}>{packages[0]?.product.priceString}/month</Text>
            <Text style={styles.trial}>Start with 7-day free trial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planButton, styles.yearlyButton]}
            onPress={() => handleSubscribe(packages[1])}
            disabled={loading}
          >
            <Text style={styles.planTitle}>{packages[1]?.product.title}</Text>
            <Text style={styles.price}>{packages[1]?.product.priceString}/year</Text>
            <Text style={styles.savings}>Save 17%</Text>
            <Text style={styles.trial}>Start with 7-day free trial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestore}
            disabled={restoring}
          >
            <Text style={styles.restoreText}>
              {restoring ? "Restoring..." : "Restore Purchases"}
            </Text>
          </TouchableOpacity>
        </View>


      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  planButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  yearlyButton: {
    backgroundColor: '#34C759',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#fff',
  },
  savings: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  trial: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  restoreButton: {
    padding: 15,
  },
  restoreText: {
    color: '#007AFF',
    fontSize: 16,
  },
});