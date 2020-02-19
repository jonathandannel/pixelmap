import React, { useEffect, useState, useCallback, useRef } from "react";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "expo-vector-icons";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default function CameraView({
  setTakingPhoto,
  cameraPermissions,
  setCameraPermissions,
  getCameraPermissions,
  setChosenPhoto,
  chosenPhoto
}) {
  const cameraRef = useRef();
  const [cameraRatio, setCameraRatio] = useState(null);

  const getBestRatio = async current => {
    const ratios = await current.getSupportedRatiosAsync();
    return ratios[ratios.length - 1];
  };

  const takePhoto = async () => {
    const photo = await this.cameraRef.current.takePictureAsync();
    setChosenPhoto(photo);
  };

  useEffect(() => {
    if (!cameraPermissions) {
      getCameraPermissions(setCameraPermissions);
    }
  });

  useEffect(() => {
    if (chosenPhoto) {
      setTakingPhoto(false);
    }
  }, [chosenPhoto]);

  useEffect(() => {
    if (cameraRef.current) {
      getBestRatio(cameraRef.current).then(r => setCameraRatio(r));
    }
  }, [cameraRef]);

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={styles.cameraPreview}
        ref={cameraRef}
        ratio={cameraRatio}
        autoFocus={Camera.Constants.AutoFocus.on}
        type={Camera.Constants.Type.back}
      />
      <View style={styles.cameraActions}>
        <TouchableOpacity
          style={{
            backgroundColor: "transparent"
          }}
          onPress={takePhoto}
        >
          <MaterialCommunityIcons
            name="camera"
            style={{ color: "#fff", fontSize: 40 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraPreview: {
    flex: 1,
    position: "absolute",
    width: deviceWidth,
    height: deviceHeight,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  cameraActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 30
  }
});
