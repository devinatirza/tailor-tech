import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IProduct } from '../interfaces/product-interfaces';
import { TailorHomeStackParamList } from './TailorHomeStack';
import { useUser } from '../contexts/user-context';

type Navigation = NavigationProp<TailorHomeStackParamList, 'Chats'>;

const TailorHomeScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const [tailorProducts, setTailorProducts] = useState<IProduct[]>([]);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = useUser();

  async function fetchProducts(query = '') {
    try {
      const response = await axios.get('http://localhost:8000/products/get-tailor', {
        params: { query, tailor_id: user?.ID },
      });
      setTailorProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveFromProduct(productId: number) {
    try {
      await axios.delete(`http://localhost:8000/products/delete/${productId}`);
      setTailorProducts((prevProducts) => prevProducts.filter(product => product.ID !== productId));
    } catch (error) {
      console.log('Error removing product:', error);
    }
  }

  useEffect(() => {
    if (user?.ID) {
      fetchProducts();
    }
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => {
      subscription?.remove();
    };
  }, [user]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchProducts(query);
  };

  const numColumns = 2;
  const itemWidth = screenWidth / numColumns - 30;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TailorTech</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
            <Image source={require('../assets/chat_icon.png')} style={styles.chatIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Image source={require('../assets/searchbar.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Browse Your Collection..."
            placeholderTextColor="#260101"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={tailorProducts}
        renderItem={({ item }) => <TailorProductCard product={item} itemWidth={itemWidth} handleRemoveFromProduct={handleRemoveFromProduct} />}
        keyExtractor={(item) => item.ID.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.productsContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingLeft: 28,
    paddingRight: 33,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: deviceWidth * 0.1,
    fontWeight: 'bold',
    color: '#260101',
    marginTop: 15,
    marginLeft: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  chatIcon: {
    width: 32,
    height: 32,
    marginLeft: 15,
    marginTop: 15,
  },
  searchContainer: {
    marginTop: 18,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4DCD5',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor: '#260101',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#260101',
  },
  productsContainer: {
    paddingBottom: 20,
  },
  noItemsText: {
    fontSize: 20,
    color: '#260101',
    textAlign: 'center',
    marginTop: 20,
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 6,
    right: 5.5,
  },
  deleteIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#260101',
  },
  tailorName: {
    fontSize: 16,
    textAlign: 'center',
    color: '#593825',
    fontWeight: '600',
    marginTop: 2,
  },
  productDesc: {
    marginTop: 2,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  productSize: {
    marginTop: 2,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 5,
    color: '#260101',
    fontWeight: '600',
  },
  productPrice: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#260101',
  },
});

const TailorProductCard: React.FC<{ product: IProduct; itemWidth: number; handleRemoveFromProduct: (productId: number) => void }> = ({ product, itemWidth, handleRemoveFromProduct }) => {
  return (
    <View style={[styles.productItem, { width: itemWidth }]}>
      <Image source={{ uri: product.ImgUrl }} style={styles.productImage} />
      <TouchableOpacity style={styles.deleteIconContainer} onPress={() => handleRemoveFromProduct(product.ID)}>
        <Image source={require('../assets/delete_icon.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
      <Text style={styles.productName}>{product.Product}</Text>
      <Text style={styles.tailorName}>{product.Tailor}</Text>
      <Text style={styles.productDesc}>{product.Desc}</Text>
      <Text style={styles.productSize}>Size {product.Size}</Text>
      <Text style={styles.productPrice}>IDR {product.Price}K</Text>
    </View>
  );
};

export default TailorHomeScreen;
