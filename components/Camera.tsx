import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import {useRef} from "react";
import {Modal, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {toggleCamera} from "@/store/globalSlice";

type Props = {
  pickImageAsync: () => Promise<void>;
  selectedImages: string[]
  setSelectedImages: (images: string[]) => void;
};

export default function Camera({ pickImageAsync, selectedImages, setSelectedImages }: Props) {
  const dispatch = useAppDispatch()
  const cameraShown = useAppSelector(state => state.global.cameraShown);
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);


  const takePicture = async () => {
    const image = await ref.current?.takePictureAsync({
      quality: 0,
      base64: true
    });
    const formattedPhoto = "data:image/png;base64," + image?.base64
    setSelectedImages([...selectedImages, formattedPhoto])
    dispatch(toggleCamera())
  };

  const selectImage = async () => {
    await pickImageAsync()
    dispatch(toggleCamera())
  }

  if (!permission) {
    return null
  }

  return (
    <Modal
      visible={cameraShown}
      animationType="slide"
      transparent={false}
      onRequestClose={() => {}}
      style={styles.container}
    >
      <CameraView
        style={styles.camera}
        ref={ref}
        mute={true}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <TouchableOpacity onPress={selectImage}>
            <AntDesign name="picture" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.shutterBtn}>
              <View style={styles.shutterBtnInner}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(toggleCamera())}>
            <FontAwesome name="close" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  camera: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
  },
});