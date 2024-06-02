import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ITailor } from '../interfaces/tailor-interfaces';
import { IProduct } from '../interfaces/product-interfaces';
import axios from 'axios';

interface ServiceItemProps {
  src: string;
  label: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ src, label }) => (
  <View style={styles.serviceItem}>
    <Image source={{ uri: src }} style={styles.serviceImage} />
    <Text style={styles.serviceLabel}>{label}</Text>
  </View>
);

const TailorCard: React.FC<{tailor: ITailor}> = ({tailor}) => (
  <View style={styles.tailorItem}>
    <Image source={{ uri: tailor.ImgUrl }} style={styles.tailorImage} />
    <Text style={styles.tailorName}>{tailor.Name}</Text>
    {/* <Text style={styles.tailorSpecialty}>{specialty}</Text> */}
    <View style={styles.locationContainer}>
      <Image source={{ uri: '../assets/location_icon.png' }} style={styles.icon} />
      <Text style={styles.tailorLocation}>{tailor.Address}</Text>
    </View>
    <View style={styles.ratingContainer}>
      <Image source={{ uri: '../assets/rating_icon.png' }} style={styles.icon} />
      <Text style={styles.ratingText}>{tailor.Rating}</Text>
    </View>
  </View>
);

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: product.ImgUrl }} style={styles.productImage} />
    <Image source={require('../assets/sale_icon.png')} style={styles.plusIcon} />
    <Text style={styles.productName}>{product.Product}</Text>
    <Text style={styles.productTailorName}>{product.Tailor}</Text>
    <Text style={styles.productDesc}>{product.Desc}</Text>
    <Text style={styles.productPrice}>IDR {product.Price}K</Text>
  </View>
);

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState<IProduct[]>([])
  const [tailors, setTailors] = useState<ITailor[]>([])

  async function fetchProducts(){
    try{
      const response =await axios.get('http://localhost:8000/products/get-all');
      setProducts(response.data)
    } catch(error){
      console.log(error)
    }
  }

  async function fetchTailors(){
    try{
      const response =await axios.get('http://localhost:8000/tailors/get-all');
      setTailors(response.data)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchTailors()
  }, [])

  const services = [
    { src: "../assets/tops_icon.webp", label: "Tops" },
    { src: "../assets/bottoms_icon.webp", label: "Bottoms" },
    { src: "../assets/dresses_icon.webp", label: "Dresses" },
    { src: "../assets/suits_icon.png", label: "Suits" },
    { src: "../assets/bags_icon.png", label: "Bags" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>TailorTech</Text>
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <ServiceItem key={index} src={service.src} label={service.label} />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tailors</Text>
          <TouchableOpacity onPress={() => navigation.navigate('All Tailor')}>
            <Text style={styles.moreButton}>More {'>'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tailorsContainer}>
          {tailors.slice(0, 8).map((tailor) => (
            <TailorCard
              key={tailor.ID}
              tailor={tailor}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('All Product')}>
            <Text style={styles.moreButton}>More {'>'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
          {products.slice(0, 8).map((product, index) => (  
            <ProductCard
              key={index}
              product={product}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: deviceWidth * 0.09,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#260101',
  },
  container: {
    paddingTop: 7,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  section: {
    marginTop: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
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
    marginBottom: 10,
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
  tailorItem: {
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 20,
    width: 160,
  },
  tailorImage: {
    width: 160,
    height: 126,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  tailorName: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#260101',
  },
  tailorSpecialty: {
    marginTop: 4,
    fontSize: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tailorLocation: {
    fontSize: 13,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#181818',
  },
  productsContainer: {
    marginTop: 8,
    flexDirection: 'row',
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 20,
    width: 160,
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
    color:'#260101',
  },
  productTailorName: {
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
    color:'#260101',
  },
  plusIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
});

export default HomeScreen;
