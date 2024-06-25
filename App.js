import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "react-native-vector-icons";



import CategoriesScreen from "./scr/screens/CategoriesScreen";
import BookingScreen from "./scr/screens/BookingScreen";
import ServiceProviderScreen from "./scr/screens/ServiceProviderScreen";
import ProfileScreen from "./scr/screens/ProfileScreen";
import HomePage from "./scr/screens/HomeScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ServiceProvider"
        component={ServiceProviderScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
       
        <Drawer.Screen name="Menu" component={BottomTabNavigator} options={{headerShown: false}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
