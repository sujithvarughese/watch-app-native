import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView
} from "react-native";
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
    <ScrollView style={styles.container}>
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
          <ActivityIndicator size="large" style={{ width: 80 }} />
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
          <ThemedText style={styles.details}>{modelDetails.price}</ThemedText>
          <ThemedText style={styles.details}>{modelDetails.productionYear}</ThemedText>
          <ThemedText style={styles.details}>{modelDetails.details}</ThemedText>
          <TouchableOpacity onPress={() => Linking.openURL(modelDetails.link)}>
            <Text style={styles.link}>{modelDetails.link}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 15,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1c1e',
  },
  imageContainer: {
    height: 100,
    width: "100%",
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 25,
    borderRadius: 15,
    margin: 20,
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
  },
  details: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    lineHeight: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    zIndex: 100,
  },
});