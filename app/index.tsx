import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import ImageUploadForm from "@/components/ImageUploadForm";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
     <ImageUploadForm />
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
