import React from "react";

import BottomTabNavigator from "./BottomTabNavigator";


import { createDrawerNavigator } from "@react-navigation/drawer";



import CategoriesScreen from './CategoriesScreen'
import BookingScreen from "./BookingScreen";
import ServiceProviderScreen from "./ServiceProviderScreen";
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Menu" component={BottomTabNavigator} options={{headerShown: false}} />
      <Drawer.Screen name="Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Booking" component={BookingScreen} />
      <Drawer.Screen name="ServiceProvider" component={ServiceProviderScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}


export default DrawerNavigator;
