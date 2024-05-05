import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ViewStyle, TextStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export interface SplashScreenProps {
}

const RegisterPage: React.FC<SplashScreenProps> = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const delay = 2000; // 2 seconds
    const timer = setTimeout(() => {
    }, delay);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register</Text>
     
    </View>
  );
};

export default RegisterPage;