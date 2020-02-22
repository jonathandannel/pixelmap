import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";

import {
  setActivePhoto,
  setCameraPermission,
  setGalleryPermission
} from "../actions";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  changeActivePhoto: photo => dispatch(setActivePhoto(photo)),
  changeGalleryPermission: permission =>
    dispatch(setGalleryPermission(permission)),
  changeCameraPermission: permission =>
    dispatch(setCameraPermission(permission))
});

function HomeView({
  state,
  navigation,
  changeActivePhoto,
  changeGalleryPermission,
  changeCameraPermission
}) {
  async function checkMultiPermissions() {
    const {
      permissions: { camera, cameraRoll }
    } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    changeCameraPermission(camera.granted);
    changeGalleryPermission(cameraRoll.granted);
  }

  useEffect(() => {
    checkMultiPermissions();
  }, []);

  const pickPhotoFromGallery = async () => {
    if (!state.galleryPermission) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        changeGalleryPermission(true);
      } else {
        console.error("Permission for gallery not granted");
        return;
      }
    }
    const photo = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
      allowsEditing: true
    });
    changeActivePhoto(photo);
    navigation.navigate("Photo");
  };

  return (
    <View>
      <Button onPress={pickPhotoFromGallery} title="gallery">
        {" "}
        Choose from gallery{" "}
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Camera");
        }}
        title="camera"
      >
        {" "}
        Take a photo{" "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
