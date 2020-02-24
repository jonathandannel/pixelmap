import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
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
    if (photo.cancelled === false) {
      changeActivePhoto(photo);
      changeUploadMode("gallery");
      navigation.navigate("Photo");
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 60,
          width: "80%",
          alignSelf: "center",
          textAlign: "center"
        }}
        category="h2"
      >
        How would you like to import your image?
      </Text>
      <Layout style={styles.buttonContainer}>
        <Button
          style={styles.button}
          status="primary"
          icon={() => <Icon name="image-2" fill="white" style={styles.icon} />}
          onPress={() => {
            changeUploadMode("gallery");
            pickPhotoFromGallery;
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
