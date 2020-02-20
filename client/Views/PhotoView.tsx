import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { StyleSheet, Button, Text, View, Image } from "react-native";

const mapStateToProps = state => ({ state });

function PhotoView({ navigation, state: { activePhoto } }) {
  const makeApiCall = async () => {
    const payload = JSON.stringify({
      type: "image",
      base64: `data:image/jpg;base64,${activePhoto.base64}`
    });
    console.log(payload);
    fetch("http://d7cbb09a.ngrok.io/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.image} source={activePhoto}></Image>
      <Button title="Process" onPress={makeApiCall}>
        Process
      </Button>
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
