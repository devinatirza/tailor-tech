import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { IStackScreenProps } from '../src/library/StackScreenProps';
import { StatusBar } from 'expo-status-bar';
import axios, { AxiosError } from 'axios';

interface Styles {
  container: ViewStyle;
  inputContainer: ViewStyle;
  inputLine: ViewStyle;
  input: TextStyle;
  inputLabel: TextStyle;
  inputField: TextStyle;
  checkBoxText: TextStyle;
  validationContainer: ViewStyle;
  checkBoxRow: ViewStyle;
  title: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  logo: ImageStyle;
  text: TextStyle;
  error: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#F8F8F8',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLine: {
    borderBottomColor: '#401201',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputLabel: {
    flex: 1, 
    marginRight: 10,
    fontSize: 16, 
  },
  inputField: {
    flex: 2, 
    borderBottomColor: '#401201',
    borderBottomWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  validationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
  },
  checkBoxText: {
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginTop: 0, 
    marginBottom: 0, 
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#401201',
  },
  buttonContainer: {
    width: '60%',
    alignItems: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#C1AEA7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#401201',
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

const RegisterScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [nameProp, setNameProp] = useState('');
  const [emailProp, setEmailProp] = useState('');
  const [passwordProp, setPasswordProp] = useState('');
  const [confirmPasswordProp, setConfirmPasswordProp] = useState('');
  const [phoneNumberProp, setPhoneNumberProp] = useState('');
  const [addressProp, setAddressProp] = useState('');
  const [error, setError] = useState('');

  const [validations, setValidations] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const {navigation} = props

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8000/register", {
        name: nameProp,
        email: emailProp,
        password: passwordProp,
        confirm: confirmPasswordProp,
        phoneNumber: phoneNumberProp,
        address: addressProp
      });
      setError('');
    } catch (error) {
      setError(error.response?.data.error || 'An error occurred');
    }
  };

  const handlePasswordChange = (value: string) => {
    setPasswordProp(value);
  
    setValidations({
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[~`!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/.test(value),
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TailorTech!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} placeholder="Name" value={nameProp} onChangeText={setNameProp} />
        </View>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} placeholder="Email" value={emailProp} onChangeText={setEmailProp} />
        </View>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={passwordProp} onChangeText={handlePasswordChange} />
        </View>
        <Text style={styles.checkBoxText}>Password Requirements:</Text>
        <View style={styles.validationContainer}>
          <View style={styles.checkBoxRow}>
            <CheckBox
              checked={validations.minLength}
              disabled
              checkedColor="#C1AEA7"
            />
            <Text style={styles.checkBoxText}>Mininum 8 characters</Text>
          </View>
          <View style={styles.checkBoxRow}>
            <CheckBox
              checked={validations.uppercase && validations.lowercase}
              disabled
              checkedColor="#C1AEA7"
            />
            <Text style={styles.checkBoxText}>At least one uppercase and lowercase letter</Text>
          </View>
          <View style={styles.checkBoxRow}>
            <CheckBox
              checked={validations.digit && validations.specialChar}
              disabled
              checkedColor="#C1AEA7"
            />
            <Text style={styles.checkBoxText}>At least one number and special character</Text>
          </View>
        </View>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} value={confirmPasswordProp} onChangeText={setConfirmPasswordProp} />
        </View>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumberProp} onChangeText={setPhoneNumberProp} />
        </View>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} placeholder="Address" value={addressProp} onChangeText={setAddressProp} />
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Already have an account?</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};


export default RegisterScreen;