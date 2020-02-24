import React, { useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Button,
  Icon,
  Layout,
  Text,
  Card,
  withStyles
} from "@ui-kitten/components";

const mapStateToProps = state => ({ state });

function PhotoView({ navigation, state: { activePhoto } }) {
  const [processedText, setProcessedText] = useState(null);

  const processPhoto = () => {
    const body = JSON.stringify({
      base64: activePhoto.base64
    });
    fetch("http://9c5dace0.ngrok.io/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body
    })
      .then(r => r.json())
      .then(j => setProcessedText(j.imageText));
  };

  // TODO: Get and render a bounding box over image text

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
            // flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 0
            // opacity: 0.3
          }}
          source={activePhoto}
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
      {/* <Text
        category="h4"
        appearance="hint"
        style={{
          textAlign: "center",
          marginTop: 20
        }}
      >
        or
      </Text> */}
      {/* {processedText && (
        <Layout level={"2"}>
          <View>
            <Card>
              <Text>{processedText}</Text>
            </Card>
          </ScrollView>
        </Layout>
      )} */}
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
  }
});

export default connect(mapStateToProps)(PhotoView);
