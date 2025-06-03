import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import React, {useState, useEffect} from "react";
import {BlurView} from "expo-blur";
import * as Haptics from "expo-haptics";
import {getPackages, purchasePackage, restorePurchases} from "@/utilities/revenuecat";
import {PurchasesPackage} from "react-native-purchases";

export default function SubscriptionScreen() {
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  const fetchPackages = async () => {
    const result = await getPackages();
    setPackages(result);
  }

  useEffect(() => {
    fetchPackages()
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
    <ScrollView style={styles.container}>
      <BlurView intensity={80} tint="dark" style={styles.content}>
      <Text style={styles.title}>Premium Features</Text>
        <Text style={styles.subtitle}>Unlock all features with a subscription</Text>

        <View style={styles.featureList}>
          <Text style={styles.featureItem}>✨ Unlimited AI generations</Text>
          <Text style={styles.featureItem}>🔄 Priority support</Text>
          <Text style={styles.featureItem}>🎨 Advanced customization</Text>
          <Text style={styles.featureItem}>📱 Access on all devices</Text>
        </View>
        <View style={styles.plansContainer}>

          <TouchableOpacity
            style={styles.planButton}
            onPress={() => handleSubscribe(packages[0])}
            disabled={loading}
          >
            <Text style={styles.planTitle}>{packages[0]?.product.title}</Text>
            <Text style={styles.price}>{packages[0]?.product.priceString}/month</Text>
            <Text style={styles.trial}>Start with 7-day free trial</Text>
            {loading && <ActivityIndicator color="white" style={styles.loader}/>}
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
            {loading && <ActivityIndicator color="white" style={styles.loader}/>}
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestore}
          disabled={restoring}
        >
          <Text style={styles.restoreText}>
            {restoring ? "Restoring..." : "Restore Purchases"}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F2C',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  featureList: {
    width: '100%',
    marginBottom: 30,
    padding: 10,
  },
  featureItem: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 30,
    textAlign: 'center',
  },
  plansContainer: {
    width: '100%',
    marginBottom: 20,
  },
  planButton: {
    width: '100%',
    padding: 24,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  yearlyButton: {
    backgroundColor: '#34C759',
  },
  selectedButton: {
    borderWidth: 1,
    borderColor: "gold",
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: 'white',
  },
  savings: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
  trial: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  loader: {
    marginTop: 10,
  },
  restoreButton: {
    padding: 15,
  },
  restoreText: {
    color: '#007AFF',
    fontSize: 16,
  },
});