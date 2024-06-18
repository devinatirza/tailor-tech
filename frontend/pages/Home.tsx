import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ITailor } from '../interfaces/tailor-interfaces';
import { IProduct } from '../interfaces/product-interfaces';
import TailorCard from './TailorCard';
import ProductCard from './ProductCard';
import { HomeStackParamList } from './HomeStack';

type Navigation = NavigationProp<HomeStackParamList, 'Wishlists', 'Chats'>;

interface ServiceItemProps {
  src: string;
  label: string;
  onPress: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ src, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.serviceItem}>
    <Image source={{ uri: src }} style={styles.serviceImage} />
    <Text style={styles.serviceLabel}>{label}</Text>
  </TouchableOpacity>
);

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [tailors, setTailors] = useState<ITailor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      const response = await axios.get('http://localhost:8000/products/get-all');
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTailors() {
    try {
      const response = await axios.get('http://localhost:8000/tailors/get-all');
      setTailors(response.data);
    } catch (error) {
      setError('Failed to fetch tailors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchTailors();
  }, []);

  const services = [
    { src: '../assets/tops_icon.webp', label: 'Tops' },
    { src: '../assets/bottoms_icon.webp', label: 'Bottoms' },
    { src: '../assets/dresses_icon.png', label: 'Dresses' },
    { src: '../assets/suits_icon.png', label: 'Suits' },
    { src: '../assets/totebag_icon.png', label: 'ToteBags' },
  ];

  const formatServiceLabel = (label: string) => {
    return label.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TailorTech</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Wishlists')}>
            <Image source={require('../assets/wishlist_icon.png')} style={styles.wishlistIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
            <Image source={require('../assets/chat_icon.png')} style={styles.chatIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle} id='Services'>Services</Text>
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              src={service.src}
              label={service.label}
              onPress={() => navigation.navigate('Services', { speciality: formatServiceLabel(service.label) })}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle} id='Tailors'>Tailors</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tailors')}>
            <Text style={styles.moreButton}>More {'>'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tailorsContainer}>
          {tailors.slice(0, 8).map((tailor) => (
            <TailorCard key={tailor.ID} tailor={tailor} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle} id='Products'>Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.moreButton}>More {'>'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: deviceWidth * 0.1,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#260101',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  wishlistIcon: {
    width: 36,
    height: 32,
    marginLeft: 15,
    marginTop: 15,
  },
  chatIcon: {
    width: 32,
    height: 32,
    marginLeft: 15,
    marginTop: 15,
  },
  container: {
    paddingTop: 7,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  serviceItem: {
    alignItems: 'center',
    width: (deviceWidth / 5) - 30,
    marginBottom: 15,
  },
  serviceImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 28,
  },
  serviceLabel: {
    marginTop: 8,
  },
  moreButton: {
    fontSize: 16,
    color: 'black',
    marginTop: 15,
  },
  tailorsContainer: {
    marginTop: 8,
    flexDirection: 'row',
  },
  productsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 20,
    width: 180,
  },
});

export default HomeScreen;
