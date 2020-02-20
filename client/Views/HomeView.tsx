import React, { useEffect, useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Text, View, Button } from "react-native";
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
  changeGalleryPermission
}) {
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
    const photo = await ImagePicker.launchImageLibraryAsync();
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
      <Button title="logger" onPress={() => console.log(state)}>
        {" "}
        Log State{" "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
