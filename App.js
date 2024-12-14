import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./scr/screens/AppNavigator";
import StackNavigator from "./scr/screens/StackNavigator";
import { UserRoleProvider } from "./scr/screens/UserRoleContext";
import * as SplashScreen from "expo-splash-screen";
import { initializeBackend } from "./scr/config/backend"; // Import backend initialization

const RootStack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        const prepareApp = async () => {
            try {
                await initializeBackend(); // Initialize backend URL
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } finally {
                SplashScreen.hideAsync(); // Hide the splash screen
            }
        };
        prepareApp();
    }, []);

    return (
        <UserRoleProvider>
            <NavigationContainer>
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name="Auth" component={StackNavigator} />
                    <RootStack.Screen
                        name="AppNavigator"
                        component={AppNavigator}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </UserRoleProvider>
    );
}
