import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./OnboardingScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import SignUpChoiceScreen from "./SignUpChoiceScreen";
import DrawerContent from "./DrawerContent";
import ServiceDetails from "./ServiceDetailScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import UserSignIn from "./UserSignIn";
import UserSignUp from "./UserSignUp";
import ProviderSignIn from "./ProviderSignIn";
import ProviderSignUp from "./ProviderSignUp";
import MapIntegrationScreen from "./MapIntegrationScreen";
const Stack = createStackNavigator();
import ServiceListScreen from "./ServiceListScreen";
import ServiceDetailScreen from "./ServiceDetailScreen";

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="onboardingScreen">
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpChoiceScreen"
        component={SignUpChoiceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MapIntegrationScreen"
        component={MapIntegrationScreen}
      />
      <Stack.Screen name="ServiceList" component={ServiceListScreen} />

      <Stack.Screen
        name="ServiceDetailScreen"
        component={ServiceDetails}
      />
       <Stack.Screen
        name="UserSignIn"
        component={UserSignIn}
        options={{ title: 'User Sign In' }}
      />
      <Stack.Screen
        name="UserSignUp"
        component={UserSignUp}
        options={{ title: 'User Sign Up' }}
      />
      <Stack.Screen
        name="ProviderSignIn"
        component={ProviderSignIn}
        options={{ title: 'Provider Sign In' }}
      />
      <Stack.Screen
        name="ProviderSignUp"
        component={ProviderSignUp}
        options={{ title: 'Provider Sign Up' }}
      />
    </Stack.Navigator>
    
  );
}

export default StackNavigator;
