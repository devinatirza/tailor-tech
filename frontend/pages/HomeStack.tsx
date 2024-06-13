import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import TailorScreen from './Tailor';
import ProductScreen from './Product';
import ClothingTypesScreen from './ClothingTypes';
import TailorService from './TailorService';
import MeasurementScreen from './Measurement';
import HelpOption from './HelpOptions';

export type HomeStackParamList = {
  Home: undefined;
  Services: undefined;
  Tailors: undefined;
  Products: undefined;
  Categories: { specialities: { Category: string, Price: number }[] };
  Measurement: undefined;
  Help: undefined
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
        name="Services" 
        component={TailorService}
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
        <Stack.Screen name="Measurement" component={MeasurementScreen} />
        <Stack.Screen name="Help" component={HelpOption} />
    </Stack.Navigator>
  );
};

export default HomeStack;
