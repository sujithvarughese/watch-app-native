import React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Stack} from 'expo-router';

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'About Authentime'}}/>
      <ScrollView>
        <ThemedView style={styles.container}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.logo}
          />
          <ThemedText type="title" style={styles.title}>
            Authentime
          </ThemedText>
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
          <View style={styles.footer}>
            <ThemedText style={styles.version}>Version 1.0.0</ThemedText>
            <ThemedText style={styles.copyright}>
              © 2024 Authentime. All rights reserved.
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
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