import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Button, Text, View, Image } from "react-native";

const mapStateToProps = state => ({ state });

function PhotoView({ navigation, state: { activePhoto } }) {
  const [processedText, setProcessedText] = useState(null);
  const processPhoto = () => {
    const body = JSON.stringify({
      base64: activePhoto.base64
    });
    fetch("http://00e46e71.ngrok.io/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body
    })
      .then(r => r.json())
      .then(j => setProcessedText(j.imageText));
  };

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.image} source={activePhoto}></Image>
      <Button title="Process" onPress={processPhoto}>
        Process
      </Button>
      {processedText && (
        <View>
          <Text> {processedText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 200,
    width: "auto"
  }
});

export default connect(mapStateToProps)(PhotoView);
