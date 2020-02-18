import React, { useEffect, useState, useCallback, useRef } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default function CameraView({ setTakingPhoto, setCameraPermissions }) {
  const cameraRef = useRef();
  const [cameraRatio, setCameraRatio] = useState(null);

  const getBestRatio = async current => {
    const ratios = await current.getSupportedRatiosAsync();
    return ratios[ratios.length - 1];
  };

  useEffect(() => {
    if (cameraRef.current) {
      getBestRatio(cameraRef.current).then(r => setCameraRatio(r));
    }
  }, [cameraRef.current]);

  return (
    <View style={styles.container}>
      <Camera
        style={styles.cameraPreview}
        ref={cameraRef}
        ratio={cameraRatio}
        autoFocus={Camera.Constants.AutoFocus.on}
        type={Camera.Constants.Type.back}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  cameraPreview: {
    position: "absolute",
    width: deviceWidth,
    height: deviceHeight,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
