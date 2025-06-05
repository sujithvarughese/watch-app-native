import {View, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import ImageViewer from '@/components/ImageViewer';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchWatchDetails} from "@/store/globalSlice";
import {router} from "expo-router";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import {ThemedText} from "@/components/ThemedText";
import Loading from "@/components/Loading";

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
      base64: true
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
      <View style={styles.instructionsContainer}>
        <ThemedText style={styles.instructionsHeader}>Upload Instructions:</ThemedText>
        <ThemedText style={styles.instructions}>
          • Upload clear, well-lit images of your watch{'\n'}
          • Make sure the watch is clean and not obscured by any objects{'\n'}
          • Include detailed images of:{'\n'}
          {'  '}- Dial{'\n'}
          {'  '}- Crown{'\n'}
          {'  '}- Case{'\n'}
          {'  '}- Bezel{'\n'}
          {'  '}- Band or Bracelet{'\n'}
          {'  '}- Clasp or Buckle{'\n'}
          {'  '}- Caseback{'\n'}
          {'  '}- Side Case Profile
        </ThemedText>
      </View>


      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          {!loading && !!selectedImages.length && <IconButton icon="refresh" label="Reset" onPress={handleReset} />}
          {!loading && <CircleButton onPress={pickImageAsync} />}
          {!loading && !!selectedImages.length && <IconButton icon="image-search" label="Submit" onPress={handleSubmit} />}
        </View>
      </View>
      {loading && <View style={styles.loadingContainer}><Loading /></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  instructionsContainer: {
    position: 'absolute',
    top: 190,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 16,
    width: '90%',
  },
  instructionsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  instructions: {
    color: '#fff',
    textAlign: 'left',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: '500',
  },
  imageContainer: {

  },

  optionsContainer: {
    position: 'absolute',
    bottom: 30,

  },
  optionsRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 10,
  },
});
