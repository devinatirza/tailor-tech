import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useUser } from '../contexts/user-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TailorHomeStackParamList } from './TailorHomeStack';

type Navigation = NavigationProp<TailorHomeStackParamList>;
const { width } = Dimensions.get('window');

const AddProduct: React.FC = () => {
  const { user } = useUser();
  const navigation = useNavigation<Navigation>();
  const [Name, setName] = useState('');
  const [Desc, setDesc] = useState('');
  const [Price, setPrice] = useState('');
  const [Size, setSize] = useState('');
  const [ImgUrl, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!ImgUrl) return null;

    setUploading(true);
    const response = await fetch(ImgUrl);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${new Date().toISOString()}`);
    await uploadBytes(storageRef, blob);

    const uploadedImgUrl = await getDownloadURL(storageRef);
    setUploading(false);
    return uploadedImgUrl;
  };

  const handleAddProduct = async () => {
    if (!Name || !Desc || !Price || !Size || !ImgUrl) {
      Alert.alert('Error', 'Please fill all fields and select an image.');
      return;
    }

    try {
      const uploadedImgUrl = await uploadImage();
      if (!uploadedImgUrl) {
        Alert.alert('Error', 'Failed to upload image.');
        return;
      }

      const response = await axios.post('http://localhost:8000/products/add', {
        Name,
        Desc,
        Price: parseInt(Price), 
        Size,
        ImgUrl: uploadedImgUrl,
        TailorID: user.ID,
        IsActive: true, 
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Product added successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'An error occurred while adding the product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <ScrollView>
        <Text style={styles.label}>Product Name</Text>
        <TextInput value={Name} onChangeText={setName} style={styles.input} />

        <Text style={styles.label}>Description</Text>
        <TextInput value={Desc} onChangeText={setDesc} style={styles.input} multiline numberOfLines={4} />

        <Text style={styles.label}>Price</Text>
        <TextInput value={Price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />

        <Text style={styles.label}>Size</Text>
        <TextInput value={Size} onChangeText={setSize} style={styles.input} />

        <Text style={styles.label}>Image</Text>
        {ImgUrl ? (
          <Image source={{ uri: ImgUrl }} style={styles.image} />
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
            <Text style={styles.pickImageText}>Pick an image</Text>
          </TouchableOpacity>
        )}

        {uploading ? (
          <ActivityIndicator size="large" color="#401201" />
        ) : (
          <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: width * 0.18,
    paddingBottom: width * 0.1,
    paddingHorizontal: width * 0.08,
    backgroundColor: 'white',
  },
  title: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: '#260101',
    marginBottom: 45,
  },
  label: {
    fontSize: width * 0.05,
    color: '#260101',
    marginBottom: 5,
  },
  input: {
    padding: width * 0.03,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#F3EADE',
    fontSize: width * 0.04,
    color: '#260101',
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
  pickImageButton: {
    backgroundColor: '#D9C3A9',
    padding: width * 0.04,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickImageText: {
    color: '#401201',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#D9C3A9',
    borderRadius: 50,
    padding: width * 0.04,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: width * 0.1,
  },
  addButtonText: {
    color: '#401201',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

export default AddProduct;
