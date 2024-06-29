import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './OnboardingScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import DrawerNavigator from './DrawerNavigator';
import HomePage from './HomeScreen';


const Stack = createStackNavigator();


function StackNavigator () {
  return (

      <Stack.Navigator initialRouteName="OnboardingScreen">
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
       
        <Stack.Screen name="SignInScreen" component={SignInScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={DrawerNavigator} options={{headerShown: false}} />
       
       
       
      </Stack.Navigator>
     
   
  )
}

export default StackNavigator;
