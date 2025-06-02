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

export default function SubscriptionScreen() {
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);


  const getPackages_ = async () => {
    console.log('subscriptions:')
    const result = await getPackages()
    console.log(result)
  }

  useEffect(() => {
    getPackages_()
  }, []);

  const handleSubscribe = async (sku: string) => {
    setLoading(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await purchasePackage(sku);
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
      <BlurView intensity={100} style={styles.content}>
        <Text style={styles.title}>Premium Features</Text>
        <Text style={styles.subtitle}>Unlock all features with a subscription</Text>

        <View style={styles.plansContainer}>
          <TouchableOpacity
            style={styles.planButton}
            onPress={() => console.log('com.authentime.pro.monthly')}
            disabled={loading}
          >
            <Text style={styles.planTitle}>Monthly Plan</Text>
            <Text style={styles.price}>$9.99/month</Text>
            {loading && <ActivityIndicator color="white" style={styles.loader}/>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planButton, styles.yearlyButton]}
            onPress={() => console.log('com.authentime.pro.yearly')}
            disabled={loading}
          >
            <Text style={styles.planTitle}>Yearly Plan</Text>
            <Text style={styles.price}>$99.99/year</Text>
            <Text style={styles.savings}>Save 17%</Text>
            {loading && <ActivityIndicator color="white" style={styles.loader}/>}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.restoreButton}
          onPress={() => console.log("Restore Purchases")}
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
    backgroundColor: '#1a1c1e',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  yearlyButton: {
    backgroundColor: '#34C759',
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