import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './HomeScreen'
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import OnboardingScreen from './OnboardingScreen';


const Stack = createStackNavigator();


const StackNavigator =()=> {
  return (

      <Stack.Navigator initialRouteName="OnboardingScreen">
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
       
        <Stack.Screen name="SignInScreen" component={SignInScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} />
        
       
       
      </Stack.Navigator>
     
   
  )
}

export default StackNavigator;
