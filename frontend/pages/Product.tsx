import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TextInput } from 'react-native';
import axios from 'axios';
import { IProduct } from '../interfaces/product-interfaces';

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: product.ImgUrl }} style={styles.productImage} />
    <Image source={require('../assets/sale_icon.png')} style={styles.plusIcon} />
    <Text style={styles.productName}>{product.Product}</Text>
    <Text style={styles.tailorName}>{product.Tailor}</Text>
    <Text style={styles.productDesc}>{product.Desc}</Text>
    <Text style={styles.productPrice}>IDR {product.Price}K</Text>
  </View>
);

const ProductScreen: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [searchQuery, setSearchQuery] = useState('');

  async function fetchProducts(query = '') {
    try {
      const response = await axios.get('http://localhost:8000/products/get-all', {
        params: { query },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => {
      subscription?.remove();
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchProducts(query);
  };

  const numColumns = 2;
  const itemWidth = screenWidth / numColumns - 40;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Image source={{ uri: '../assets/searchbar.png' }} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Products..."
            placeholderTextColor="#260101"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.ID.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.productsContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#260101',
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    paddingTop: 7,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4DCD5',
    borderRadius: 25,
    paddingHorizontal: 12,
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
    fontSize: 16.5,
    color: '#260101',
  },
  productsContainer: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    width: (Dimensions.get('window').width / 2) - 40,
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
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
  productPrice: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#260101',
  },
  plusIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default ProductScreen;
