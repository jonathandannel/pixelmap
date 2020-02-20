import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { StyleSheet, Button, Text, View, Image } from "react-native";

const mapStateToProps = state => ({ state });

function PhotoView({ navigation, state: { activePhoto } }) {
  const makeApiCall = () => {
    const blob = fetch(activePhoto.uri).then(res => res.blob());
    return fetch("http://a0f70faf.ngrok.io/scan", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: activePhoto.uri,
        data: activePhoto.base64
      })
    }).then(r => console.log(r));
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
