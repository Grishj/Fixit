import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./scr/screens/StackNavigator";
import HomePage from "./scr/screens/HomeScreen";
import AppNavigator from "./scr/screens/AppNavigator";
 function App() {
  return (
        <NavigationContainer >
        
     <AppNavigator />
     
    </NavigationContainer>
  );
}
export default App;
