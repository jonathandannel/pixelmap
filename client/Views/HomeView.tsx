import React, { useEffect } from "react";
import { StyleSheet, PushNotificationPermissions } from "react-native";
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
  const checkExistingPermissions = (): Promise<Permissions.PermissionResponse> => {
    return Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
  };

  const setStoredPermissions = (
    storedPermissions: Permissions.PermissionResponse
  ): void => {
    const {
      camera: { granted: cameraPermission },
      cameraRoll: { granted: galleryPermission }
    } = storedPermissions.permissions;
    changeCameraPermission(cameraPermission);
    changeGalleryPermission(galleryPermission);
  };

  useEffect(() => {
    checkExistingPermissions().then(permissions =>
      setStoredPermissions(permissions)
    );
  }, []);

  const setImageFromGallery = (): Promise<void> => {
    return ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
      allowsEditing: true
    }).then((photo: ImagePicker.ImagePickerResult) => {
      if (!photo.cancelled) {
        changeActivePhoto(photo);
        changeUploadMode("gallery");
      }
    });
  };

  const getGalleryPermission = (): Promise<boolean> => {
    return Permissions.askAsync(Permissions.CAMERA_ROLL).then(
      (resp: Permissions.PermissionResponse) => {
        if (resp.status === "granted") {
          return true;
        }
        return false;
      }
    );
  };

  const pickPhotoFromGallery = (): void => {
    if (!state.galleryPermission) {
      const permission = getGalleryPermission();
      if (permission) {
        setImageFromGallery().then(() => navigation.navigate("Photo"));
      }
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
