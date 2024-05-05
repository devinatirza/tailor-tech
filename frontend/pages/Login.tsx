import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { IStackScreenProps } from '../src/library/StackScreenProps';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../contexts/user-context';

interface Styles {
  container: ViewStyle;
  inputContainer: ViewStyle;
  inputLine: ViewStyle;
  input: TextStyle;
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
    marginBottom: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#401201',
  },
  buttonContainer: {
    width: '100%',
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

const LoginScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route, nameProp } = props;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const {login} = useUser()

  async function loginHandler(){

    const res = await login(email, password)
    
    if(res === ''){
      navigation.navigate('TailorTech')
    }
    else{
      setError(res);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} onChangeText={setEmail} placeholder="Email" />
        </View>
        <View style={styles.inputLine}>
          <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.buttonContainer} onPress={loginHandler}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Didn't have an account?</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;