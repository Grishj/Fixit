import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './OnboardingScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import DrawerContent from './DrawerContent';

import ForgotPasswordScreen from './ForgotPasswordScreen';
import MapIntegrationScreen from './MapIntegrationScreen';
const Stack = createStackNavigator();
import ServiceListScreen from './ServiceListScreen';
import ServiceDetailScreen from './ServiceDetailScreen';

function StackNavigator () {
  return (

      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
       
        <Stack.Screen name="SignInScreen" component={SignInScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={DrawerContent} options={{headerShown: false}} />
        <Stack.Screen name="MapIntegrationScreen" component={MapIntegrationScreen} /> 
        <Stack.Screen name="ServiceList" component={ServiceListScreen} />
    
        <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} />

      </Stack.Navigator>
     
   
  )
}

export default StackNavigator;
