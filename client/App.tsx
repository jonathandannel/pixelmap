import React, { useEffect, useState, useCallback } from "react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [galleryPermissions, setGalleryPermissions] = useState(false);
  const [galleryPhoto, setGalleryPhoto] = useState({});

  const getGalleryPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      setGalleryPermissions(true);
    }
  };

  const getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      setCameraPermissions(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (!galleryPermissions) {
        getGalleryPermissions();
      } else if (!cameraPermissions) {
        getCameraPermissions();
      }
    })();
  }, [galleryPermissions, cameraPermissions]);

  const pickPhotoFromGallery = useCallback(async () => {
    if (!galleryPermissions) {
      getGalleryPermissions();
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();
      setGalleryPhoto(result);
      console.log(result);
    }
  }, [galleryPermissions]);

  const takeCameraPhoto = useCallback(() => {
    return null;
  }, [cameraPermissions]);

  return (
    <View style={styles.container}>
      <Button onPress={pickPhotoFromGallery} title="gallery">
        {" "}
        Choose from gallery{" "}
      </Button>
      <Button onPress={takeCameraPhoto} title="camera">
        {" "}
        Take a photo{" "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
