import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Button from "@/components/Button";

type Props = {
  imgSource: ImageSourcePropType;
  selectedImages?: string[];
  setSelectedImages?: (images: string[]) => void;
};

export default function ImageViewer({ imgSource, selectedImages, setSelectedImages }: Props) {
  const imageSource = selectedImages?.length ? { uri: selectedImages } : imgSource;

  const removeImage = (indexToRemove: number) => {
    const images = selectedImages!.filter((image, index) => index !== indexToRemove)
    setSelectedImages!(images)
  }

  return (
    <View style={styles.container}>
      {selectedImages?.map((image, index) =>
        <View key={index}>
          <Button style={styles.icon} onPress={() => removeImage(index)}>
            <MaterialIcons name="delete-forever" size={32} color="red" />
          </Button>
          <Image source={image} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 18,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  }
});
