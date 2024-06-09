import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Alert, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { useUser } from '../contexts/user-context';
import { useNavigation } from '@react-navigation/native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const UpdateProfileScreen = () => {
  const { user, updateUser } = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState(user.Name);
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user.PhoneNumber);
  const [address, setAddress] = useState(user.Address);

  const [validations, setValidations] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setValidations({
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[~`!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/.test(value),
    });
  };

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const updatedUser: any = {
      userId: user.ID,
      name,
      email,
      phoneNumber,
      address,
      points: user.Points,
    };

    if (password) {
      updatedUser.password = password;
      updatedUser.confirm = confirmPassword;
    }

    try {
      const response = await axios.post('http://localhost:8000/update-profile', updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      if (response.status !== 200) {
        Alert.alert('Error', result.error);
      } else {
        updateUser(result.user);
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.navigate('ProfileScreen');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: '../assets/profileIcon.png' }} style={styles.profileImage} />
        </View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          secureTextEntry
        />
        {password.length > 0 && (
          <>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
            />
          </>
        )}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          multiline
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
    paddingHorizontal: 30,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: deviceWidth * 0.4,
    height: deviceWidth * 0.4,
  },
  label: {
    color: '#260101',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
    marginLeft: 15,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F3EADE',
    height: 50,
    marginBottom: 20,
    color: '#260101',
    fontSize: 18,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    backgroundColor: '#D9C3A9',
    marginHorizontal: 50,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#260101',
    fontWeight: 'bold',
  },
});

export default UpdateProfileScreen;