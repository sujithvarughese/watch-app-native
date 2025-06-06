import {StyleSheet, useWindowDimensions, View} from "react-native";
import ImageUploadForm from "@/components/ImageUploadForm";
import {Image} from "expo-image";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";


export default function HomeScreen() {
  const { width } = useWindowDimensions()
  return (
    <View style={width < 500 ? styles.container : styles.containerTablet}>
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
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo-light.png')} style={width < 500 ? styles.logo : styles.logoTablet} />
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
    paddingTop: 40
  },
  containerTablet: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 300
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
  logoContainer: {
    position: 'absolute',
    opacity: 0.8,
    width: "100%",
    top: 0,

  },
  logo: {
    height: 300
  },
  logoTablet: {
    height: 500
  },
  footerContainer: {
    alignItems: 'center',
  },
});
