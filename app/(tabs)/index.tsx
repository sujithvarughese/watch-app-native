import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import ImageUploadForm from "@/components/ImageUploadForm";
import {Image} from "expo-image";
import {SubscriptionModal} from "@/components/Subscriptions";
import React from "react";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/banner.jpeg')} style={styles.imageContainer} />
      <View style={styles.backgroundImageContainer}>
        <Image source={require('../../assets/images/logo2.png')} style={styles.backgroundImage} />
      </View>
      <ImageUploadForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    height: 100,
    width: "100%",
    zIndex: 100,
  },
  backgroundImageContainer: {
    position: 'absolute',
    opacity: 0.8,
    width: "100%",
    top: 500,
    padding: 36,

  },
  backgroundImage: {
    height: 100
  },
  footerContainer: {
    alignItems: 'center',
  },
});
