import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import ProviderHomeScreen from "./ProviderHomeScreen";
import TaskListScreen from "./TaskListScreen";
import StatsScreen from "./StatsScreen";
import ProfileScreen from "./ProfileScreen";
//import HomePage from "./HomePage"; // Import HomePage component
import ServiceProviderHomeScreen from "./ProviderHomeScreen";

const Tab = createBottomTabNavigator();

function ServiceProviderBottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Tasks") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Stats") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "ServiceHome") {
            iconName = focused ? "apps" : "apps-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="ServiceHome"
        component={HomePage}
        options={{ headerShown: false, title: "ServiceProviderhomeScreen" }}
      />
      <Tab.Screen
        name="Home"
        component={ServiceProviderHomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default ServiceProviderBottomTabNavigator;
