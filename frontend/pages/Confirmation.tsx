import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { useNavigation, RouteProp, useRoute, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { HomeStackParamList } from './HomeStack';
import { useUser } from '../contexts/user-context';

type ConfirmationPageRouteProp = RouteProp<HomeStackParamList, 'Confirmation'>;
type Navigation = NavigationProp<HomeStackParamList, 'Measurement'>;
// type Navigation = NavigationProp<HomeStackParamList, 'Measurement' | 'Request'>;

const ConfirmationScreen: React.FC = () => {
  const route = useRoute<ConfirmationPageRouteProp>();
  const { measurements, selectedType, tailorId, tailorName } = route.params;
  const navigation = useNavigation<Navigation>();
  const { user } = useUser();
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      const requestEndpoint = 'http://localhost:8000/requests/add-request';
      const requestData = {
        UserID: user.ID,
        Name: user.Name,
        Desc: description,
        RequestType: selectedType,
        TailorID: tailorId,
        Status: 'Pending',
      };
      const requestResponse = await axios.post(requestEndpoint, requestData);
  
      if (requestResponse.status === 201) {
        const requestId = requestResponse.data.ID; 
        const endpoint = `http://localhost:8000/measurements/${selectedType.toLowerCase()}`;
        console.log('Submitting payload:', measurements);
        const response = await axios.post(endpoint, {
          ...measurements,
          RequestID: requestId 
        });
        if (response.status === 201) {
          console.log('Measurements saved successfully.');
        //   navigation.navigate('RequestFinal');
        } else {
          console.error(`Unexpected response status: ${response.status}`);
        }
      } else {
        console.error(`Unexpected response status: ${requestResponse.status}`);
      }
    } catch (error) {
      console.error('Error saving measurements:', error);
      setErrorMessage('Failed to save measurements');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Order</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.Name}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{user.Address}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Clothing Type</Text>
        <Text style={styles.value}>{selectedType}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Measurement</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Measurement', { selectedType: selectedType, tailorId, tailorName })}>
          <Image source={require('../assets/pencilIcon.png')} style={styles.pencilIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tailor's Name</Text>
        <Text style={styles.value}>{tailorName}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your request description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: 'white',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginVertical: 10,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#260101',
    marginBottom: 30,
    marginTop: 10,
  },
  detailContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    color: '#260101',
    fontWeight: '600'
  },
  value: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#5B3E31',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  pencilIcon: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: -20,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#5B3E31',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#5B3E51',
  },
  confirmButton: {
    backgroundColor: '#D9C3A9',
    height: height * 0.06,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  confirmText: {
    fontSize: width * 0.05,
    color: '#260101',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConfirmationScreen;
