import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const RequestSent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('TailorTech');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/TailorTech_ThankYou.png')} style={styles.logo} />
      <Text style={styles.message}>
        Your order is being processed. 
        Our tailor will reach out to you shortly.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9C3A9',
  },
  logo: {
    width: 230,
    height: 212,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#401201',
    paddingHorizontal: 20,
  },
});

export default RequestSent;
