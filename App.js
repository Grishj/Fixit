import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './scr/screens/AppNavigator'; // Main app navigation
import StackNavigator from './scr/screens/StackNavigator'; // Authentication and onboarding
import { UserRoleProvider } from './scr/screens/UserRoleContext'; // Import the UserRoleProvider

const RootStack = createStackNavigator();

function App() {
  return (
    <UserRoleProvider> {/* Wrap your navigation with the UserRoleProvider */}
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {/* Authentication and onboarding flow */}
          <RootStack.Screen name="Auth" component={StackNavigator} />

          {/* Main application navigation */}
          <RootStack.Screen name="AppNavigator" component={AppNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </UserRoleProvider>
  );
}

export default App;
