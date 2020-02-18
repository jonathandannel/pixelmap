import React, { useEffect, useState, useCallback, useRef } from "react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function App() {
  const cameraRef = useRef();
  const [cameraRatio, setCameraRatio] = useState(null);
  const [cameraMounted, setCameraMounted] = useState(false);

  // const [cameraPermissions, setCameraPermissions] = useState(false);
  // const [galleryPermissions, setGalleryPermissions] = useState(false);
  // const [takingPhoto, setTakingPhoto] = useState(false);
  // const [galleryPhoto, setGalleryPhoto] = useState({});
  // const cameraRef = useRef();

  // const getGalleryPermissions = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status === "granted") {
  //     setGalleryPermissions(true);
  //   }
  // };

  // const getCameraPermissions = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   if (status === "granted") {
  //     setCameraPermissions(true);
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     if (!galleryPermissions) {
  //       getGalleryPermissions();
  //     } else if (!cameraPermissions) {
  //       getCameraPermissions();
  //     }
  //   })();
  // }, [galleryPermissions, cameraPermissions]);

  // const pickPhotoFromGallery = useCallback(async () => {
  //   if (!galleryPermissions) {
  //     getGalleryPermissions();
  //   } else {
  //     const result = await ImagePicker.launchImageLibraryAsync();
  //     setGalleryPhoto(result);
  //   }
  // }, [galleryPermissions]);

  // const takeCameraPhoto = async () => {
  //   if (cameraPermissions && cameraRef.current) {
  //     setTakingPhoto(true);
  //     const photo = await cameraRef.current.takePictureAsync({
  //       onPictureSaved: p => setGalleryPhoto(p)
  //     });
  //     setGalleryPhoto(photo);
  //   }
  // };

  const getBestRatio = async current => {
    const ratios = await current.getSupportedRatiosAsync();
    return ratios[ratios.length - 1];
  };

  useEffect(() => {
    if (cameraRef.current) {
      setCameraMounted(true);
    }
  }, [cameraRef.current]);

  useEffect(() => {
    if (cameraMounted) {
      getBestRatio(cameraRef.current).then(r => setCameraRatio(r));
    }
  }, [cameraMounted]);

  return (
    <View style={styles.container}>
      <Camera
        style={styles.preview}
        ref={cameraRef}
        ratio={cameraRatio}
        autoFocus={Camera.Constants.AutoFocus.on}
        type={Camera.Constants.Type.back}
      ></Camera>
    </View>
  );

  // return !takingPhoto ? (
  //   <View style={styles.container}>
  //     <Button onPress={pickPhotoFromGallery} title="gallery">
  //       {" "}
  //       Choose from gallery{" "}
  //     </Button>
  //     <Button onPress={takeCameraPhoto} title="camera">
  //       {" "}
  //       Take a photo{" "}
  //     </Button>
  //   </View>
  // ) : (
  //   <View>
  //     <Camera ref={cameraRef} type={Camera.Constants.Type.front}></Camera>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  preview: {
    position: "absolute",
    width: 410,
    height: 830,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
