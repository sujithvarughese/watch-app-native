import {View, StyleSheet, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchWatchDetails} from "@/store/globalSlice";
import {router} from "expo-router";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import {Image} from "expo-image";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function ImageUploadForm() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.global.loading)

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
    await dispatch(fetchWatchDetails(selectedImages))
    router.navigate('/results')
  }

  const handleReset = () => {
    setSelectedImages([])
  }

  return (
    <View style={styles.container}>




      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
      </View>


      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={handleReset} />
          <CircleButton onPress={pickImageAsync} />
          {loading ? <ActivityIndicator size="large" /> : <IconButton icon="image-search" label="Submit" onPress={handleSubmit} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {

  },

  optionsContainer: {
    position: 'absolute',
    bottom: 40,
  },
  optionsRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
