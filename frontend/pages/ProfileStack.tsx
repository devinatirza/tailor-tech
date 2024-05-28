import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import ProfileScreen from './Profile';
import UpdateProfileScreen from './UpdateProfile';
import VoucherScreen from './Voucher';
import FAQsScreen from './FAQs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  
  return (
    <Stack.Navigator initialRouteName={'ProfileScreen'}>
        <Stack.Screen name='ProfileScreen' component={ProfileScreen}
        options={{
        headerShown: false
        }}>   
        </Stack.Screen>
        <Stack.Screen name='Update Profile' component={UpdateProfileScreen}></Stack.Screen>
        <Stack.Screen name='Vouchers' component={VoucherScreen}></Stack.Screen>  
        <Stack.Screen name='FAQs' component={FAQsScreen}></Stack.Screen>  
    </Stack.Navigator>
    );
};

export default ProfileStack;