import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";

const mapStateToProps = state => ({ state });

function PhotoView({ navigation, state }) {
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.image} source={state.activePhoto}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 300,
    width: "auto"
  }
});

export default connect(mapStateToProps)(PhotoView);
