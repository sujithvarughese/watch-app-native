import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import {useAppDispatch} from "@/store/hooks";
import {fetchWatchDetails} from "@/store/globalSlice";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function ImageUploadForm() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button onPress={pickImageAsync}>Choose a Photo</Button>
        <Button onPress={() => dispatch(fetchWatchDetails(selectedImage))}>Use this photo</Button>
      </View>
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
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
