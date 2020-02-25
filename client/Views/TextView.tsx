import React, { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Button, Icon, Layout, Text, Card } from "@ui-kitten/components";

const mapStateToProps = state => ({ state });

// TODO: Add loading spinner

function TextView({ state, navigation }) {
  useEffect(() => {}, []);

  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: 0,
        paddingBottom: 20
      }}
    >
      <Card>
        <ScrollView style={{ padding: 5 }}>
          <Text
            style={{
              alignSelf: "center",
              padding: 30
            }}
            category="s2"
          >
            {state.processedText || "Loading"}
          </Text>
        </ScrollView>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(TextView);
