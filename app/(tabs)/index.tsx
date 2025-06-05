import { StyleSheet, View } from "react-native";
import ImageUploadForm from "@/components/ImageUploadForm";
import {Image} from "expo-image";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";


export default function HomeScreen() {
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
      <View style={styles.backgroundImageContainer}>
        <Image source={require('../../assets/images/logo-light.png')} style={styles.backgroundImage} />
      </View>
      <ImageUploadForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 70
  },
  imageContainer: {
    width: '100%',
    position: 'absolute',
  },
  image: {
    height: 720,
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
  backgroundImageContainer: {
    position: 'absolute',
    opacity: 0.8,
    width: "100%",
    top: 0,
    padding: 36,

  },
  backgroundImage: {
    height: 300
  },
  footerContainer: {
    alignItems: 'center',
  },
});
