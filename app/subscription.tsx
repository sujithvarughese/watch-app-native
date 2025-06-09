import {StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator,} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import React, {useState, useEffect} from "react";
import * as Haptics from "expo-haptics";
import {restorePurchases} from "@/utilities/revenuecat";
import {PurchasesPackage} from "react-native-purchases";
import {usePurchases} from "@/context/PurchasesContext";
import {Image} from "expo-image";
import {ThemedText} from "@/components/ThemedText";
import {useRouter} from "expo-router";

export default function SubscriptionScreen() {

  const { currentOffering, purchasePackage, validateUser, validated } = usePurchases()
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    const offerings = currentOffering?.availablePackages
    setPackages(offerings ?? [])
  }, []);

  const router = useRouter()
  useEffect(() => {
    if (validated) {
      router.replace("/(tabs)")
    }
  }, [validated]);

  const handleSubscribe = async (pkg: PurchasesPackage) => {
    setLoading(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (!pkg) {
        throw new Error("No subscription package selected.");
      }
      await purchasePackage(pkg);
      validateUser()
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
        validateUser()
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
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/subscription.jpeg')} style={styles.image}/>
        <LinearGradient
          colors={['rgba(0,0,0,1)', 'transparent']}
          style={styles.gradientTop}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,1)']}
          style={styles.gradientBottom}
        />
      </View>

      <View style={styles.heading}>
        <ThemedText style={styles.title}>Authentime</ThemedText>
        <ThemedText style={styles.subtitle}>Try free for 7 days, then {packages[1]?.product.priceString}/year.</ThemedText>
        <ThemedText style={styles.description}>Get unlimited watch authentications with our highly trained AI models.</ThemedText>
      </View>

      <View style={styles.featureList}>
        <ThemedText style={styles.featureItem}>🔍 AI-Powered Watch Authentications</ThemedText>
        <ThemedText style={styles.featureItem}>👨‍💻 Expert-level analysis in seconds</ThemedText>
        <ThemedText style={styles.featureItem}>📊 Detailed Authenticity Reports</ThemedText>
        <ThemedText style={styles.featureItem}>🕵️‍♂️ Counterfeit Detection Alerts</ThemedText>
        <ThemedText style={styles.featureItem}>🕰️ Watch Database Access</ThemedText>
        <ThemedText style={styles.featureItem}>📱 Access on all devices</ThemedText>
      </View>

      <View style={styles.plansContainer}>
        <TouchableOpacity
          style={[styles.planButton, styles.yearlyButton]}
          onPress={() => handleSubscribe(packages[1])}
          disabled={loading}
        >
          {loading ? <ActivityIndicator size="large" color="white" style={{ width: 80 }} /> : <ThemedText style={styles.planTitle}>START FOR FREE 🙌</ThemedText>}
        </TouchableOpacity>
        <ThemedText style={styles.trial}>7 days free, then {packages[1]?.product.priceString} per year. (billed annually)</ThemedText>
        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestore}
          disabled={restoring}
        >
          <ThemedText style={styles.restoreText}>
            {restoring ? "Restoring..." : "Restore Purchases"}
          </ThemedText>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    position: 'absolute',
  },
  image: {
    height: 700,
    width: '100%',
  },
  gradientTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
  },
  gradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 500,
  },
  heading: {
    marginVertical: 24,
    marginHorizontal: 30,
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 600,
    color: 'white',
    textAlign: 'center',
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 36,
  },
  featureList: {
    width: '100%',
    marginBottom: 70,
    paddingHorizontal: 36
  },
  featureItem: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '600',
  },
  plansContainer: {
    width: '100%',
    marginBottom: 28,
    alignItems: 'center',
  },
  planButton: {
    width: '80%',
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
  loader: {
    marginTop: 10,
  },
  trial: {
    color: 'white',
  },
  restoreButton: {
    padding: 15,
  },
  restoreText: {
    color: '#007AFF',
    fontSize: 16,
  },
});