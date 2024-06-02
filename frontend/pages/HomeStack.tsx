import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import HomeScreen from './Home';
import TailorScreen from './Tailor';
import ProductScreen from './Product';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  
  return (
    <Stack.Navigator initialRouteName={'HomeScreen'}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}
        options={{
        headerShown: false
        }}>   
        </Stack.Screen>
        <Stack.Screen name='All Tailor' component={TailorScreen}></Stack.Screen>
        <Stack.Screen name='All Product' component={ProductScreen}></Stack.Screen>  
    </Stack.Navigator>
    );
};

export default HomeStack;