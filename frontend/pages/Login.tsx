import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IStackScreenProps } from '../src/library/StackScreenProps';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../contexts/user-context';
import { IUser } from '../interfaces/user-interfaces';
import axios from 'axios';

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
    backgroundColor: '#D9C3A9',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#260101',
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

const LoginScreen: React.FC<IStackScreenProps> = (props) => {
  const { navigation, route, nameProp } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, updateUser, user } = useUser();

  useEffect(() => {
    const validate = async () => {
      const response = await axios.get("http://localhost:8000/validate", {
        withCredentials: true,
      });
      return response.data;
    };

    validate()
      .then((res: IUser) => {
        if (!user) {
          updateUser(res);
        }
      })
      .catch((error) => {
        // navigate("/")
      });
    if (user) navigation.navigate('TailorTech');
  }, [user]);

  async function loginHandler() {
    const res = await login(email, password);

    if (res === '') {
      setEmail('');
      setPassword('');
      navigation.navigate('TailorTech');
    } else {
      setError(res);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputLine}>
          <TextInput value={email} style={styles.input} onChangeText={setEmail} placeholder="Email" />
        </View>
        <View style={styles.inputLine}>
          <TextInput value={password} style={styles.input} onChangeText={setPassword} placeholder="Password" secureTextEntry />
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
