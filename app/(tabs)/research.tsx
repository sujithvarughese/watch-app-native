import {StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Linking, ScrollView} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchModelDetails} from "@/store/globalSlice";
import {useAppSelector} from "@/store/hooks";
import {Image} from "expo-image";
import {ThemedText} from "@/components/ThemedText";

export default function ResearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const loading = useAppSelector(state => state.global.loading);
  const modelDetails = useAppSelector(state => state.global.modelDetails);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(fetchModelDetails(searchQuery) as any);
    }
  };
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


      <ScrollView style={styles.content}>
        <View style={styles.headerContainer}>
          <ThemedText style={styles.headerDescription}>
            Enter your watch's make and model below to get detailed information about your timepiece.
          </ThemedText>
        </View>
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
          style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Rolex Datejust 1200"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {loading
            ?
            <ActivityIndicator size="large" style={{ width: 80 }} />
            :
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          }
        </LinearGradient>

        {modelDetails && (
          <View style={styles.resultsContainer}>
            <ThemedText style={styles.title}>{modelDetails.name}</ThemedText>
            {modelDetails.reference && <ThemedText style={styles.details}>Reference: {modelDetails.reference}</ThemedText>}
            <ThemedText style={styles.details}>{modelDetails.price}</ThemedText>
            <ThemedText style={styles.details}>{modelDetails.productionYear}</ThemedText>
            <ThemedText style={styles.details}>{modelDetails.details}</ThemedText>
            <TouchableOpacity onPress={() => Linking.openURL(modelDetails.link)}>
              <Text style={styles.link}>{modelDetails.link}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 70
  },
  content: {
    paddingTop: 220
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    lineHeight: 24,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 15,
    fontSize: 16,
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
  searchContainer: {
    flexDirection: 'row',
    margin: 12,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 80
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 25,
    borderRadius: 15,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  details: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    lineHeight: 24,
  },
});