import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserBottomTabNavigator from './UserBottomTabNavigator';
import ServiceProviderBottomTabNavigator from './ServiceProviderBottomTabNavigator';
import { UserRoleContext } from '../context/UserRoleContext'; // Ensure you have this context implemented

const AppNavigator = () => {
  const { userRole } = useContext(UserRoleContext); // 'user' or 'serviceProvider'

  return (
    <NavigationContainer>
      {userRole === 'user' ? <UserBottomTabNavigator /> : <ServiceProviderBottomTabNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
