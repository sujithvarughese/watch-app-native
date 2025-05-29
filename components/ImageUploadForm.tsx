import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import {useAppDispatch} from "@/store/hooks";
import {fetchWatchDetails} from "@/store/globalSlice";
import {router} from "expo-router";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function ImageUploadForm() {
  const [selectedImages, setSelectedImages] = useState<string[] | undefined>(undefined);
  const dispatch = useAppDispatch();

  const pickImageAsync = async () => {
    if (selectedImages?.length >= 6) {
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0,
      base64: true,
    });
    if (!result.canceled) {
      const images = result.assets.map(image => "data:image/png;base64," + image.base64)
      if (!selectedImages?.length) {
        setSelectedImages(images)
      } else {
        setSelectedImages([...selectedImages, ...images])
      }
    } else {
      alert('You did not select any image.');
    }
  };

  const handleSubmit = async () => {
    console.log(selectedImages)
    await dispatch(fetchWatchDetails(selectedImages))
    router.navigate('/results')
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
      </View>
      <View style={styles.footerContainer}>
        <Button onPress={pickImageAsync}>Choose a Photo</Button>
        <Button onPress={handleSubmit}>Use this photo</Button>
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
