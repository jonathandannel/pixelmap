import React, { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { setActivePhoto, setCameraPermission } from "../actions";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  changeActivePhoto: photo => dispatch(setActivePhoto(photo)),
  changeCameraPermission: permission =>
    dispatch(setCameraPermission(permission))
});

function CameraView({
  state,
  navigation,
  changeActivePhoto,
  changeCameraPermission
}) {
  const cameraRef = useRef();
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraRatio, setCameraRatio] = useState("4:3");

  useEffect(() => {
    (async () => {
      if (!state.cameraPermission) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === "granted") {
          changeCameraPermission(true);
        } else {
          navigation.navigate("Home");
        }
      }
    })();
  }, []);

  const getBestRatio = () => {
    cameraRef.current
      .getSupportedRatiosAsync()
      .then(r => setCameraRatio(r[r.length - 1]));
  };

  const takePhoto = () => {
    if (cameraReady) {
      cameraRef.current.takePictureAsync({ allowsEditing: true }).then(p => {
        changeActivePhoto(p);
        navigation.navigate("Photo");
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (cameraReady) {
      getBestRatio();
    }
  }, [cameraReady]);

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={styles.cameraPreview}
        ref={cameraRef}
        ratio={cameraRatio}
        onCameraReady={() => setCameraReady(true)}
        autoFocus={Camera.Constants.AutoFocus.on}
        type={Camera.Constants.Type.back}
      />
      {cameraReady && (
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
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
