import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ITailor } from '../interfaces/tailor-interfaces';
import { IUser } from '../interfaces/user-interfaces';
import { useUser } from '../contexts/user-context';

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

  const { user, updateUser } = useUser();

  useEffect(() => {
    const delay = 3000;
    const timer = setTimeout(() => {
      const validate = async () => {
        try {
          const response = await axios.get("http://localhost:8000/validate", {
            withCredentials: true,
          });
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      };

      validate()
        .then((res: IUser | ITailor) => {
          if (res && !user) {
            updateUser(res);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      if (!user) {
        console.log("masuk")
        navigation.navigate('Role');
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user)
      if ('ImgUrl' in user) {
        navigation.navigate('TailorTechTailor');
      } else {
        navigation.navigate('TailorTech');
      }
    }
  }, [user]);

  const handlePress = () => {
    navigation.navigate('Role');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/splashscreen15xzoom.png')}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SplashScreen;
