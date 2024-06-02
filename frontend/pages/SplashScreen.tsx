import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9C3A9',
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
});

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const delay = 3000;
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/spashscreen.png')}>
        </Image>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SplashScreen;
