import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";

import {
  setActivePhoto,
  setCameraPermission,
  setGalleryPermission
} from "../actions";
import { ScaleFromCenterAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";

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
    if (photo.cancelled === false) {
      changeActivePhoto(photo);
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
        // appearance="hint"
        category="h2"
      >
        How would you like to import your image?
      </Text>
      <Layout style={styles.buttonContainer}>
        <Button
          style={styles.button}
          status="primary"
          icon={() => <Icon name="image-2" fill="white" style={styles.icon} />}
          onPress={pickPhotoFromGallery}
        ></Button>
        <Button
          style={styles.button}
          status="primary"
          icon={() => <Icon name="camera" fill="white" style={styles.icon} />}
          onPress={() => {
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
            navigation.navigate("Camera");
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
