import React, { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";

import {
  setActivePhoto,
  setCameraPermission,
  setGalleryPermission,
  setUploadMode
} from "../actions";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  changeActivePhoto: photo => dispatch(setActivePhoto(photo)),
  changeGalleryPermission: permission =>
    dispatch(setGalleryPermission(permission)),
  changeCameraPermission: permission =>
    dispatch(setCameraPermission(permission)),
  changeUploadMode: mode => dispatch(setUploadMode(mode))
});

function HomeView({
  state,
  navigation,
  changeActivePhoto,
  changeUploadMode,
  changeGalleryPermission,
  changeCameraPermission
}) {
  const getStoredPermissions = async (): Promise<void> => {
    const {
      permissions: {
        camera: { granted: cameraGranted },
        cameraRoll: { granted: cameraRollGranted }
      }
    }: Permissions.PermissionResponse = await Permissions.getAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    changeCameraPermission(cameraGranted);
    changeGalleryPermission(cameraRollGranted);
  };

  useEffect((): void => {
    getStoredPermissions();
  }, []);

  const pickPhotoFromGallery = async (): Promise<void> => {
    if (!state.galleryPermission) {
      const {
        status
      }: Permissions.PermissionResponse = await Permissions.askAsync(
        Permissions.CAMERA
      );
      if (status === "granted") {
        changeGalleryPermission(true);
      } else {
        return;
      }
    }
    const photo: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync(
      {
        base64: true,
        quality: 1,
        allowsEditing: true
      }
    );
    if (photo && !photo.cancelled) {
      changeActivePhoto(photo);
      changeUploadMode("gallery");
      navigation.navigate("Photo");
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Text style={styles.greetText} category="h2">
        How would you like to import your image?
      </Text>
      <Layout style={styles.buttonContainer}>
        <Button
          style={styles.button}
          status="primary"
          icon={() => <Icon name="image-2" fill="white" style={styles.icon} />}
          onPress={() => {
            changeUploadMode("gallery");
            pickPhotoFromGallery();
          }}
        ></Button>
        <Button
          style={styles.button}
          status="primary"
          icon={() => <Icon name="camera" fill="white" style={styles.icon} />}
          onPress={() => {
            changeUploadMode("camera");
            navigation.navigate("Camera");
          }}
        ></Button>
        <Button
          style={styles.button}
          status="primary"
          icon={() => (
            <Icon name="link-2-outline" fill="white" style={styles.icon} />
          )}
          onPress={() => {
            changeUploadMode("link");
            navigation.navigate("Photo");
          }}
        ></Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  greetText: {
    marginTop: 60,
    width: "80%",
    alignSelf: "center",
    textAlign: "center"
  },
  buttonContainer: {
    flex: 0.5,
    margin: 50,
    alignSelf: "center"
  },
  button: {
    margin: 20,
    width: 120,
    height: 120
  },
  icon: {
    height: 40,
    width: 40
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
