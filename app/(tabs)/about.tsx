import React from 'react';
import {StyleSheet, View, ScrollView, Image, useColorScheme, useWindowDimensions} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {LinearGradient} from "expo-linear-gradient";

export default function AboutScreen() {

  const { width } = useWindowDimensions()
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/subscription.jpeg')} style={styles.image}/>
        <LinearGradient
          colors={['rgba(0,0,0,1)', 'transparent']}
          style={styles.gradientTop}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,1)']}
          style={styles.gradientBottom}
        />
      </View>

      <ScrollView style={styles.content}>
        <Image source={require('../../assets/images/logo-light.png')} style={width < 500 ? styles.logo : styles.logoTablet} />
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
          <ThemedText style={styles.version}>Version 1.0.15</ThemedText>
          <ThemedText style={styles.copyright}>
            © 2025 Authentime. All rights reserved.
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    paddingHorizontal: 20
  },
  imageContainer: {
    width: '100%',
    position: 'absolute',
  },
  image: {
    height: 720,
    width: '100%',
    opacity: 0.5,
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
  logo: {
    width: "100%",
    height: 200,
  },
  logoTablet: {
    width: "100%",
    height: 580,

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