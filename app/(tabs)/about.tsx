import React from 'react';
import {StyleSheet, View, ScrollView, Image, useColorScheme} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Stack} from 'expo-router';

export default function AboutScreen() {

  const colorScheme = useColorScheme()

  return (
    <ThemedView>
      <ScrollView>
        <ThemedView style={styles.container}>
          {colorScheme === 'dark' ?
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            :
            <Image source={require('../../assets/images/logo-light.png')} style={styles.logo} />
          }
          <ThemedText style={styles.description}>
            Welcome to Authentime, your trusted companion in watch authentication.
            Our advanced AI technology helps you verify the authenticity of luxury
            timepieces by analyzing various details and characteristics.
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Key Features
          </ThemedText>
          <ThemedText style={styles.feature}>
            • AI-powered authentication analysis{'\n'}
            • Detailed authenticity reports{'\n'}
            • High-resolution image processing{'\n'}
            • Expert-level accuracy
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Privacy Policy
          </ThemedText>
          <ThemedText style={styles.legalText}>
            We collect and process images solely for watch authentication purposes. Your data is encrypted and securely
            stored. We do not share your personal information with third parties. For more details, please read our full
            Privacy Policy.
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Terms and Conditions
          </ThemedText>
          <ThemedText style={styles.legalText}>
            By using Authentime, you agree to our terms of service. This application is strictly for reference and
            entertainment purposes only and is NOT a substitute for professional watch authentication services.
            Authentication results are provided as-is without warranty or guarantee of accuracy. The app's analysis
            should not be used as the sole basis for making purchasing decisions or determining authenticity. We
            strongly recommend consulting certified watch experts and obtaining proper documentation for definitive
            authentication. We reserve the right to modify or discontinue services at any time. Users acknowledge that
            they rely on the app's results at their own risk, and we are not liable for any losses or damages resulting
            from decisions made based on the app's authentication results. For complete details, please review our Terms
            of Service.
          </ThemedText>
          <View style={styles.footer}>
            <ThemedText style={styles.version}>Version 1.0.1</ThemedText>
            <ThemedText style={styles.copyright}>
              © 2024 Authentime. All rights reserved.
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    height: 100,
    width: "100%",
    zIndex: 100,
  },
  logo: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  legalText: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 24,
    lineHeight: 20,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    opacity: 0.7,
  },
});