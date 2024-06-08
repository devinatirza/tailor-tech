import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import HomeScreen from './Home';
import TailorScreen from './Tailor';
import ProductScreen from './Product';
import ClothingTypesScreen from './ClothingTypes';

export type HomeStackParamList = {
  Home: undefined;
  Categories: { specialities: { Category: string, Price: number }[] };
  Tailors: undefined;
  Products: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Tailors" 
        component={TailorScreen}
      />
      <Stack.Screen 
        name="Products" 
        component={ProductScreen}
      />
      <Stack.Screen 
        name="Categories" 
        component={ClothingTypesScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
