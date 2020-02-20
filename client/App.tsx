import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducer";

import HomeView from "./Views/HomeView";
import CameraView from "./Views/CameraView";
import PhotoView from "./Views/PhotoView";

const store = createStore(rootReducer);
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="Camera" component={CameraView} />
          <Stack.Screen name="Photo" component={PhotoView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
