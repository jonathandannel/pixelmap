import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image } from "react-native";
import {
  Button,
  Icon,
  Layout,
  Text,
  Card,
  Select
} from "@ui-kitten/components";

const mapStateToProps = state => ({ state });

const languages = [
  { text: "English" },
  { text: "French" },
  { text: "Spanish" }
];

function PhotoView({ navigation, state }) {
  const [processedText, setProcessedText] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const changeLanguage = v => setSelectedLanguage(v);

  const processPhoto = () => {
    const body = JSON.stringify({
      base64: state.activePhoto.base64
    });
    fetch("http://9c5dace0.ngrok.io/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body
    })
      .then(r => r.json())
      .then(j => setProcessedText(j.imageText));
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
          data={languages}
          onBlur={() => null}
          onFocus={() => null}
          selectedOption={selectedLanguage}
          onSelect={changeLanguage}
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
          // onPress={pickPhotoFromGallery}
        ></Button>
        <Button
          style={styles.optionButton}
          status="primary"
          icon={() => (
            <Icon name="camera" fill="white" style={styles.optionButtonIcon} />
          )}
          onPress={() => {
            // navigation.navigate("Camera");
          }}
        ></Button>
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
            // navigation.navigate("Camera");
          }}
        ></Button>
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
    // margin: 50,
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

export default connect(mapStateToProps)(PhotoView);
