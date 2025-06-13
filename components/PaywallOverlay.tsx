import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import {router} from "expo-router";

const PaywallOverlay = () => {

  const handleClick = () => {
    router.navigate("/subscription")
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.message}>Unlock this content</Text>
        <Pressable style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </Pressable>
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
    paddingTop: 72,
  },
  content: {
    backgroundColor: "#222",
    padding: 28,
    borderRadius: 22,
    alignItems: "center",
    opacity: 0.98,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  message: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default PaywallOverlay;