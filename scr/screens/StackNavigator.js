import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./OnboardingScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import SignUpChoiceScreen from "./SignUpChoiceScreen";
import DrawerContent from "./DrawerContent";
import HomePage from "./HomeScreen.js";
import ProfileScreen from "./ProfileScreen.js";
import UserHomePage from "./UserHomeScreen.js";
import UserHomeScreen from "./UserHomeScreen.js";
import ServiceProviderHomeScreen from "./ProviderHomeScreen.js";
import ServiceDetails from "./ServiceDetailScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import UserSignIn from "./UserSignIn";
import UserSignUp from "./UserSignUp";
import ProviderSignIn from "./ProviderSignIn";
import ProviderSignUp from "./ProviderSignUp";
import MapIntegrationScreen from "./MapIntegrationScreen";
import CategoriesScreen from "./CategoriesScreen";
import ServiceDetailScreen from "./ServiceDetailScreen";
import ServiceListScreen from "./ServiceListScreen";
import BookingDetailsScreen from "./BookingDetailsScreen";
import ChoiceScreen from "./ChoiceScreen.js";
import BookingScreen from "./BookingScreen.js";
import TaskListScreen from "./TaskListScreen.js";
import StatsScreen from "./StatsScreen.js";
const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChoiceScreen">
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChoiceScreen"
        component={ChoiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserHomeScreen"
        component={UserHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceProviderHomeScreen"
        component={ServiceProviderHomeScreen}
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
        name="MapIntegrationScreen"
        component={MapIntegrationScreen}
      />
      <Stack.Screen name="ServiceListScreen" component={ServiceListScreen} />
      <Stack.Screen name="StatsScreen" component={StatsScreen} />
      <Stack.Screen name="TaskListScreen" component={TaskListScreen} />

      <Stack.Screen
        name="UserSignIn"
        component={UserSignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserSignUp"
        component={UserSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProviderSignIn"
        component={ProviderSignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProviderSignUp"
        component={ProviderSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{ title: "Our Services" }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetailScreen"
        component={ServiceDetailScreen}
        options={{ title: "Service Details" }}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      <Stack.Screen
        name="BookingDetailsScreen"
        component={BookingDetailsScreen}
        options={{ title: "Booking Details" }}
      />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
