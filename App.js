import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./scr/screens/AppNavigator"; // Main app navigation
import StackNavigator from "./scr/screens/StackNavigator"; // Authentication and onboarding

const RootStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Authentication and onboarding flow */}
        <RootStack.Screen name="Auth" component={StackNavigator} />

        {/* Main application navigation */}
        <RootStack.Screen name="AppNavigator" component={AppNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
