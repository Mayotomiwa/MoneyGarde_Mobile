import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import Home from "../screens/Home";
import Pager from "../screens/Pager";

const Stack = createStackNavigator();

export default function RootNavigator() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAppLaunched, setIsAppLaunched] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        async function fetchData() {
            const appData = await AsyncStorage.getItem('isAppLaunched');
            if (appData == null) {
                setIsAppLaunched(true)
                AsyncStorage.setItem('isAppLaunched', 'false');
            } else {
                setIsAppLaunched(false)
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        isAppLaunched != null &&
        (<NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAppLaunched && <Stack.Screen name="Pager" component={Pager} />}
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>)
    )
}
