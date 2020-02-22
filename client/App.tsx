import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducer";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { default as appTheme } from "./custom-theme.json";
const theme = { ...light, ...appTheme };

import HomeView from "./Views/HomeView";
import CameraView from "./Views/CameraView";
import PhotoView from "./Views/PhotoView";

const store = createStore(rootReducer);
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeView} />
            <Stack.Screen name="Camera" component={CameraView} />
            <Stack.Screen name="Photo" component={PhotoView} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}

export default App;
