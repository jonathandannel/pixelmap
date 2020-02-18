import React, { useEffect, useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Text, View, Button } from "react-native";

import { getGalleryPermissions, getCameraPermissions } from "./AppPermissions";
import CameraView from "./CameraView";

export default function App() {
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [galleryPermissions, setGalleryPermissions] = useState(false);
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [chosenPhoto, setChosenPhoto] = useState({});

  useEffect(() => {
    (async () => {
      if (!galleryPermissions) {
        getGalleryPermissions(setGalleryPermissions);
      } else if (!cameraPermissions) {
        getCameraPermissions(setCameraPermissions);
      }
    })();
  }, [galleryPermissions, cameraPermissions]);

  const pickPhotoFromGallery = useCallback(async () => {
    if (!galleryPermissions) {
      getGalleryPermissions(setGalleryPermissions);
    } else {
      const photo = await ImagePicker.launchImageLibraryAsync();
      setChosenPhoto(photo);
    }
  }, [galleryPermissions]);

  const getPhotoFromCameraView = () => {
    // TODO
  };

  return !takingPhoto ? (
    <View>
      <Button onPress={pickPhotoFromGallery} title="gallery">
        {" "}
        Choose from gallery{" "}
      </Button>
      <Button onPress={() => setTakingPhoto(true)} title="camera">
        {" "}
        Take a photo{" "}
      </Button>
    </View>
  ) : (
    <CameraView
      setTakingPhoto={setTakingPhoto}
      setCameraPermissions={setCameraPermissions}
    />
  );
}

const styles = StyleSheet.create({});
