import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Modal, Button, Icon, Layout, Text, Card } from "@ui-kitten/components";

const mapStateToProps = state => ({ state });

function PhotoView({ navigation, state: { activePhoto } }) {
  const [processedText, setProcessedText] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

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
    <Layout style={{ flex: 1 }}>
      <Card>
        <TouchableOpacity onPress={() => setShowImageModal(true)}>
          <Image style={styles.image} source={activePhoto}></Image>
        </TouchableOpacity>
      </Card>
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
      {processedText && (
        <Layout level={"2"}>
          <View>
            <Card>
              <Text>{processedText}</Text>
            </Card>
          </View>
        </Layout>
      )}
      <Modal
        style={styles.imageModal}
        onBackdropPress={() => setShowImageModal(false)}
        visible={showImageModal}
      >
        <Image style={styles.imageModal_image} source={activePhoto}></Image>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 200,
    width: "auto"
  },
  imageModal: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center"
  },
  imageModal_image: {
    height: 500,
    width: 600,
    resizeMode: "contain"
  },
  button: {},
  icon: {
    height: 40,
    width: 40
  }
});

export default connect(mapStateToProps)(PhotoView);
