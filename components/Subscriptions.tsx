import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {BlurView} from 'expo-blur';

export const SubscriptionModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // Handle subscription logic here
    setIsVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <BlurView intensity={70} style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>Select the plan that works best for you</Text>

          <TouchableOpacity
            style={styles.planButton}
            onPress={() => handleSubscribe('monthly')}
          >
            <Text style={styles.planTitle}>Monthly Plan</Text>
            <Text style={styles.price}>$9.99/month</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planButton, styles.yearlyButton]}
            onPress={() => handleSubscribe('yearly')}
          >
            <Text style={styles.planTitle}>Yearly Plan</Text>
            <Text style={styles.price}>$99.99/year</Text>
            <Text style={styles.savings}>Save 17%</Text>
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
});