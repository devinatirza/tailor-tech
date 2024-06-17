import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './Chat';
import TailorHomeScreen from './TailorHome';

export type TailorHomeStackParamList = {
  Home: undefined;
  Chats: undefined;
};

const Stack = createStackNavigator<TailorHomeStackParamList>();
const Tab = createBottomTabNavigator();

const TailorHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={TailorHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Chats" 
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

export default TailorHomeStack;
