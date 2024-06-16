import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import TailorScreen from './Tailor';
import ProductScreen from './Product';
import TailorService from './TailorService';
import MeasurementScreen from './Measurement';
import HelpOption from './HelpOptions';
import HomeServiceScreen from './HomeService';
import WishlistScreen from './Wishlists';
import ChatScreen from './Chat';
import CategoriesScreen from './Categories';
import ConfirmationScreen from './Confirmation';
import RequestSent from './RequestSent';

export type HomeStackParamList = {
  Home: undefined;
  Chats: undefined;
  Wishlists: undefined;
  Tailors: undefined;
  Products: undefined;
  Services: { speciality: string };
  Categories: { 
    specialities: { Category: string, Price: number }[], 
    tailorId: number, 
    tailorName: string 
  };
  Measurement: { 
    selectedType: string,
    tailorId: number,
    tailorName: string
  };
  Help: undefined;
  HomeService: undefined;
  Confirmation: { 
    measurements: any,
    selectedType: string, 
    tailorId: number, 
    tailorName: string,
  };
  RequestSent: undefined;
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
        name="Wishlists" 
        component={WishlistScreen}
      />
      <Stack.Screen 
        name="Chats" 
        component={ChatScreen}
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
        component={CategoriesScreen}
      />
      <Stack.Screen 
        name="Measurement" 
        component={MeasurementScreen} 
      />
      <Stack.Screen 
        name="Help" 
        component={HelpOption} 
      />
      <Stack.Screen 
        name="HomeService" 
        component={HomeServiceScreen} 
      />
      <Stack.Screen 
        name="Confirmation" 
        component={ConfirmationScreen}  
      />
      {/* <Stack.Screen 
        name="RequestSent" 
        component={RequestSent}  
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
