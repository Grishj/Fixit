import React, { useContext } from 'react';
import UserBottomTabNavigator from './UserBottomTabNavigator';
import ServiceProviderBottomTabNavigator from './ServiceProviderBottomTabNavigator';
import { UserRoleContext } from './UserRoleContext';

function AppNavigator  ()  {
  const { userRole } = useContext(UserRoleContext);

  return userRole === 'user' ? <UserBottomTabNavigator /> : <ServiceProviderBottomTabNavigator />;
};

export default AppNavigator;
