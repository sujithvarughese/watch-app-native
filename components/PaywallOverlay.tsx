import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Alert, TouchableOpacity, ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";
import {usePurchases} from "@/context/PurchasesContext";
import {PurchasesPackage} from "react-native-purchases";
import * as Haptics from "expo-haptics";
import {restorePurchases} from "@/utilities/revenuecat";
import {ThemedText} from "@/components/ThemedText";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PaywallOverlay = () => {

  const { currentOffering, purchasePackage, validateUser, validated } = usePurchases()
  const [loading, setLoading] = useState(false);
  const [lifetimeLoading, setLifetimeLoading] = useState(false);
  const [annualLoading, setAnnualLoading] = useState(false);
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    const offerings = currentOffering?.availablePackages
    setPackages(offerings ?? [])
  }, []);

  const router = useRouter()

  const handleSubscribe = async (pkg: PurchasesPackage) => {
    if (pkg.packageType === "LIFETIME") {
      setLifetimeLoading(true);
    } else if (pkg.packageType === "ANNUAL") {
      setAnnualLoading(true);
    } else if (pkg.packageType === "MONTHLY") {
      setMonthlyLoading(true);
    }
    setLoading(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (!pkg) {
        throw new Error("No subscription package selected.");
      }
      await purchasePackage(pkg);
      validateUser()
      Alert.alert("Success", "Subscription successful!");
      router.replace("/results")
    } catch (error) {
      Alert.alert("Error", "Subscription failed. Please try again.");
    } finally {
      if (pkg.packageType === "LIFETIME") {
        setLifetimeLoading(false);
      } else if (pkg.packageType === "ANNUAL") {
        setAnnualLoading(false);
      } else if (pkg.packageType === "MONTHLY") {
        setMonthlyLoading(false);
      }
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
        router.replace("/results")
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
    <View style={styles.overlay}>
      <View style={styles.container}>

        <View style={styles.content}>
          <FontAwesome name="lock" size={160} color="black" />
          <View style={styles.heading}>
            <ThemedText style={styles.title}>Unlock your full report.</ThemedText>
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>Limited Time Introductory Offer</Text>
              <Text style={styles.offerPrice}>Lifetime access for {packages[2]?.product.priceString}</Text>
            </View>
            <ThemedText style={styles.description}>Get unlimited watch authentications with our highly trained AI models.</ThemedText>
          </View>


          <View style={styles.featureList}>
            <ThemedText style={styles.featureItem}>🔍 AI Watch Authentications</ThemedText>
            <ThemedText style={styles.featureItem}>🕵️‍♂️ Expert analysis in seconds</ThemedText>
            <ThemedText style={styles.featureItem}>📊 Authenticity Reports</ThemedText>
            <ThemedText style={styles.featureItem}>🕰️ Watch Database Access</ThemedText>
            <ThemedText style={styles.featureItem}>📱 Access on all devices</ThemedText>
            <ThemedText style={styles.featureItem}>✨ New feature updates</ThemedText>
          </View>

          <View style={styles.plansContainer}>
            <TouchableOpacity
              style={styles.planButton}
              onPress={() => handleSubscribe(packages[2])}
              disabled={loading}
            >
              {lifetimeLoading ? <ActivityIndicator color="white" size="large" /> :
                <View style={styles.plans}>
                  <ThemedText style={styles.planTitle}>GET FULL REPORT 🙌</ThemedText>
                  <ThemedText style={styles.planSubtitle}>Lifetime Access</ThemedText>
                </View>
              }
            </TouchableOpacity>
            <ThemedText style={styles.trial}>You will be billed a one-time charge of {packages[2]?.product.priceString} for full access and unlimited authentication reports.</ThemedText>

            <ThemedText style={styles.planOptionsTitle}>More Purchase Options</ThemedText>
            <View style={styles.planOptions}>
              <TouchableOpacity
                style={styles.planButtons}
                onPress={() => handleSubscribe(packages[1])}
                disabled={loading}
              >
                {annualLoading ? <ActivityIndicator color="white" /> :
                  <View style={styles.plans}>
                    <ThemedText style={styles.planTitles}>{packages[1]?.packageType}</ThemedText>
                    <ThemedText style={styles.planSubtitles}>{packages[1]?.product.priceString}/yr</ThemedText>
                  </View>
                }
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.planButtons}
                onPress={() => handleSubscribe(packages[0])}
                disabled={loading}
              >
                {monthlyLoading ? <ActivityIndicator color="white" /> :
                  <View style={styles.plans}>
                    <ThemedText style={styles.planTitles}>{packages[0]?.packageType}</ThemedText>
                    <ThemedText style={styles.planSubtitles}>{packages[0]?.product.priceString}/mo</ThemedText>
                  </View>
                }
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.trial}>You will be billed on an annual or monthly basis, depending on the subscription you select for full access and unlimited authentication reports.</ThemedText>

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
          <FontAwesome name="lock" size={160} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,20,20,0.86)',
    alignItems: "center",
    zIndex: 1000,
    height: "100%",
  },
  container: {
    margin: 56,
    width: "90%",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#007AFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    shadowRadius: 10,
    elevation: 8,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: 'white',
  },
  heading: {
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 600,
    color: 'white',
    textAlign: 'center',
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    padding: 16,
  },
  featureList: {
    width: '100%',
    gap: 12,
    padding: 16,
  },
  featureItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  plansContainer: {
    width: '100%',
    alignItems: 'center',
  },
  planButton: {
    padding: 16,
    width: '80%',
    backgroundColor: '#34C759',
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  planButtons: {
    padding: 12,
    width: '40%',
    backgroundColor: 'dodgerblue',
    borderRadius: 20,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  plans: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  planOptionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingTop: 16,
  },
  selectedButton: {
    borderWidth: 1,
    borderColor: "gold",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  planSubtitle: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  planSubtitles: {
    fontSize: 14,
  },
  planTitles: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  loader: {
    marginTop: 10,
  },
  trial: {
    color: 'white',
    fontSize: 14,
    padding: 16,
    textAlign: 'center',
  },
  restoreButton: {
    margin: 16,
  },
  restoreText: {
    color: '#007AFF',
    fontSize: 16,
  },
  planOptions: {
    flexDirection: 'row',
  },
  offerBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    gap: 4,
    backdropFilter: 'blur(14px)',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'center',
  },
  offerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  offerPrice: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default PaywallOverlay;