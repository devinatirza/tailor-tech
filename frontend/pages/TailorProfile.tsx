import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useUser } from '../contexts/user-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ITailor } from '../interfaces/tailor-interfaces';

const TailorProfileScreen: React.FC = () => {
  const { updateUser, user } = useUser();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout');
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      updateUser(null);
      navigation.navigate('Role');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  console.log('User Data:', user);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
      <Text style={styles.profileText}>Profile</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: (user as ITailor)?.ImgUrl }} style={styles.profileImage} />
        </View>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{(user as ITailor)?.Name}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{(user as ITailor)?.Email}</Text>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.text}>{(user as ITailor)?.Address}</Text>
        <Text style={styles.label}>Rating</Text>
        <Text style={styles.text}>{(user as ITailor)?.Rating}</Text>
        <View style={styles.specialitiesContainer}>
          <Text style={styles.label}>Specialities</Text>
          {(user as ITailor)?.Speciality && (user as ITailor).Speciality.length > 0 ? (
            (user as ITailor).Speciality.map((speciality, index) => (
              <View key={index} style={styles.specialityItem}>
                <Text style={styles.specialityCategory}>{speciality.Category}</Text>
                <Text style={styles.specialityPrice}>Base Price: IDR {speciality.Price}K</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noSpecialitiesText}>No specialities available</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 28,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: deviceWidth * 0.1,
    width: '100%',
  },
  profileText: {
    fontSize: deviceWidth * 0.09,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#260101',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: deviceWidth * 0.4,
    height: deviceWidth * 0.4,
    borderRadius: deviceWidth * 0.2,
  },
  label: {
    color: '#260101',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
    marginLeft: 15,
  },
  text: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F3EADE',
    height: 50,
    marginBottom: 20,
    color: '#260101',
    fontSize: 18,
  },
  specialitiesContainer: {
    marginTop: 10,
  },
  specialityItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F3EADE',
  },
  specialityCategory: {
    fontSize: 18,
    color: '#593825',
    fontWeight: '600',
    marginBottom: 5,
  },
  specialityPrice: {
    fontSize: 16,
    color: '#260101',
  },
  noSpecialitiesText: {
    fontSize: 16,
    color: '#260101',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#AC1A1A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});

export default TailorProfileScreen;
