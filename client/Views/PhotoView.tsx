import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  Button,
  Icon,
  Layout,
  Text,
  Card,
  Select
} from "@ui-kitten/components";

import {
  setActivePhoto,
  setGalleryPermission,
  setLanguage,
  setProcessedText
} from "../actions";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  changeActivePhoto: photo => dispatch(setActivePhoto(photo)),
  changeGalleryPermission: permission =>
    dispatch(setGalleryPermission(permission)),
  changeLanguage: language => dispatch(setLanguage(language)),
  changeProcessedText: text => dispatch(setProcessedText(text))
});

const languages = [
  { text: "English" },
  { text: "French" },
  { text: "Spanish" },
  { text: "Simplified Chinese" },
  { text: "Traditional Chinese" },
  { text: "Italian" },
  { text: "Russian" },
  { text: "German" }
];

function PhotoView({
  navigation,
  state,
  changeActivePhoto,
  changeGalleryPermission,
  changeProcessedText,
  changeLanguage
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const setLanguage = v => {
    setSelectedLanguage(v);
    changeLanguage(v.text);
  };

  const processPhoto = () => {
    const body = JSON.stringify({
      base64: state.activePhoto.base64,
      language: state.language
    });
    fetch("http://d2fbf505.ngrok.io/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body
    })
      .then(r => r.json())
      .then(j => {
        changeProcessedText(j.imageText);
        navigation.navigate("Text");
      });
  };

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
    <Layout style={{ flex: 1, padding: 5 }}>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 12,
          marginBottom: 15,
          borderRadius: 5,
          height: 40,
          backgroundColor: "#77D497"
        }}
      >
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <Text style={{ color: "white" }} category="s2">
            Image imported successfully
          </Text>
          <Icon
            style={{ marginLeft: 6, width: 12, height: 21 }}
            name="checkmark-outline"
            fill="white"
          ></Icon>
        </View>
      </View>
      <Layout>
        <Select
          style={{ marginBottom: 15 }}
          data={languages}
          onBlur={() => null}
          onFocus={() => null}
          selectedOption={selectedLanguage}
          onSelect={setLanguage}
        ></Select>
      </Layout>
      <Card
        style={{
          marginTop: 5,
          marginBottom: 5,
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <Image
          style={{
            height: 300,
            width: "auto",
            justifyContent: "flex-end",
            paddingBottom: 0
          }}
          source={state.activePhoto}
        ></Image>
        <Button
          status="primary"
          style={styles.button}
          icon={() => (
            <Icon name="activity" fill="white" style={styles.icon}></Icon>
          )}
          onPress={processPhoto}
        >
          Process
        </Button>
      </Card>
      <Text
        style={{ marginTop: 20, marginBottom: 5, alignSelf: "center" }}
        category="h6"
        appearance="hint"
      >
        Not the image you wanted to use?
      </Text>
      <Layout style={styles.optionButtonContainer}>
        <Button
          style={styles.optionButton}
          status="primary"
          icon={() => (
            <Icon name="home" fill="white" style={styles.optionButtonIcon} />
          )}
          onPress={() => navigation.navigate("Home")}
        ></Button>
        {state.uploadMode === "camera" && (
          <Button
            style={styles.optionButton}
            status="primary"
            icon={() => (
              <Icon
                name="camera"
                fill="white"
                style={styles.optionButtonIcon}
              />
            )}
            onPress={() => {
              navigation.navigate("Camera");
            }}
          ></Button>
        )}
        {state.uploadMode === "gallery" && (
          <Button
            style={styles.optionButton}
            status="primary"
            icon={() => (
              <Icon
                name="image-2"
                fill="white"
                style={styles.optionButtonIcon}
              />
            )}
            onPress={() => {
              () => pickPhotoFromGallery();
            }}
          ></Button>
        )}
        {state.uploadMode === "link" && (
          <Button
            style={styles.optionButton}
            status="primary"
            icon={() => (
              <Icon
                name="link-2-outline"
                fill="white"
                style={styles.optionButtonIcon}
              />
            )}
            onPress={() => {
              // TODO
            }}
          ></Button>
        )}
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  },
  icon: {
    height: 40,
    width: 40
  },
  textContainer: {
    flex: 1
  },
  optionButtonContainer: {
    flex: 0.5,
    flexDirection: "row",
    alignSelf: "center"
  },
  optionButton: {
    margin: 20,
    width: 60,
    height: 60
  },
  optionButtonIcon: {
    height: 20,
    width: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoView);
