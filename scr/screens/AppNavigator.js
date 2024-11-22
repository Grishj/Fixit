import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CategoriesScreen from './CategoriesScreen';
import BookingScreen from './BookingScreen';
import TaskListScreen from './TaskListScreen'; // For service provider tasks
import StatsScreen from './StatsScreen'; // For service provider stats
import { UserRoleContext } from './UserRoleContext'; // Context for user role

const Tab = createBottomTabNavigator();

// User Bottom Tab Navigator
const UserBottomTabNavigator = () => {
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// Service Provider Bottom Tab Navigator
const ServiceProviderBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Tasks" component={TaskListScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// Main Navigator
const AppNavigator = () => {
  const { userRole } = useContext(UserRoleContext); // 'user' or 'serviceProvider'

  return (
    // Directly use the Bottom Tab Navigator based on the user role
    userRole === 'user' ? <UserBottomTabNavigator /> : <ServiceProviderBottomTabNavigator />
  );
};

export default AppNavigator;
