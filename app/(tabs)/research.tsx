import {StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Linking} from "react-native";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchModelDetails} from "@/store/globalSlice";
import {useAppSelector} from "@/store/hooks";
import {Image} from "expo-image";
import type {ModelDetails} from "@/store/globalSlice";
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
      <Image source={require('../../assets/images/banner.jpeg')} style={styles.imageContainer} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter watch make and model"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {loading
          ?
          <ActivityIndicator size="large" color="#0000ff"/>
          :
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        }
      </View>


      {modelDetails && (
        <View style={styles.resultsContainer}>
          <Text style={styles.title}>{modelDetails.name}</Text>
          {modelDetails.reference && <ThemedText style={styles.details}>Reference: {modelDetails.reference}</ThemedText>}
          <ThemedText style={styles.details}>{modelDetails.productionYear}</ThemedText>
          <ThemedText style={styles.details}>{modelDetails.details}</ThemedText>
          <TouchableOpacity onPress={() => Linking.openURL(modelDetails.link)}>
            <Text style={styles.link}>{modelDetails.link}</Text>
          </TouchableOpacity>


        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  imageContainer: {
    height: 100,
    width: "100%",
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 20,

  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    zIndex: 100,
  },
  categoryContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 5,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  rating: {
    fontSize: 16,
    color: '#007AFF',
    marginVertical: 5,
  },
  comments: {
    fontSize: 14,
    color: 'white',
  },
});