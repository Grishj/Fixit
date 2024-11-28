import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import UserHomeScreen from './UserHomeScreen';
import CategoriesScreen from './CategoriesScreen';
import BookingScreen from './BookingScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

function UserBottomTabNavigator  ()  {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Booking') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={UserHomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default UserBottomTabNavigator;
