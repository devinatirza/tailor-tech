import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

interface TailorItemProps {
  src: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
}

const TailorCard: React.FC<TailorItemProps> = ({ src, name, specialty, location, rating }) => (
  <View style={styles.tailorItem}>
    <Image source={{ uri: src }} style={styles.tailorImage} />
    <Text style={styles.tailorName}>{name}</Text>
    <Text style={styles.tailorSpecialty}>{specialty}</Text>
    <View style={styles.locationContainer}>
      <Image source={{ uri: '../assets/location_icon.png' }} style={styles.icon} />
      <Text style={styles.tailorLocation}>{location}</Text>
    </View>
    <View style={styles.ratingContainer}>
      <Image source={{ uri: '../assets/rating_icon.png' }} style={styles.icon} />
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  </View>
);

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl1: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: product.imageUrl1 }} style={styles.productImage} />
    <Image source={require('../assets/sale_icon.png')} style={styles.plusIcon} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.productDescription}>{product.description}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
  </View>
);

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const services = [
    { src: "../assets/tops_icon.webp", label: "Tops" },
    { src: "../assets/bottoms_icon.webp", label: "Bottoms" },
    { src: "../assets/dresses_icon.webp", label: "Dresses" },
    { src: "../assets/suits_icon.png", label: "Suits" },
    { src: "../assets/bags_icon.png", label: "Bags" },
  ];

  const tailors = [
    {
      src: "../assets/tailor_dev.jpg",
      name: "Dev’s Tailor House",
      specialty: "Speciality in Tops, Dresses, and Suits",
      location: "Jakarta Barat",
      rating: 1112,
    },
    {
      src: "../assets/tailor_cia.jpg",
      name: "Cia House of Fashion",
      specialty: "Speciality in Tops, Bottoms, and Suits",
      location: "Jakarta Barat",
      rating: 89,
    },
    {
      src: "../assets/tailor_lini.jpg",
      name: "Lini Tailor",
      specialty: "Speciality in Tops, Bottoms, and Suits",
      location: "Jakarta Timur",
      rating: 320,
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Woman’s Blouse",
      description: "Hazelnut Woman’s Blouse",
      price: "IDR 99K",
      imageUrl1: "../assets/product_blouse.png"
    },
    {
      id: 2,
      name: "Batik Blouse",
      description: "Brown Batik Strecht Blouse",
      price: "IDR 129K",
      imageUrl1: "../assets/product_batik.jpg"
    },
    {
      id: 3,
      name: "Short Pleated Skirt",
      description: "Short, flared skirt in woven fabric",
      price: "IDR 99K",
      imageUrl1: "../assets/product_skirt.jpeg"
    }
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
          {tailors.map((tailor, index) => (
            <TailorCard
              key={index}
              src={tailor.src}
              name={tailor.name}
              specialty={tailor.specialty}
              location={tailor.location}
              rating={tailor.rating}
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
          {products.map((product, index) => (
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
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#260101',
  },
  container: {
    paddingTop: 7,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    width: '100%',
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
    width: (Dimensions.get('window').width - 60) / 5, // Adjust based on the padding and number of items per row
    marginBottom: 10,
  },
  serviceImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1, // Ensures the image is square
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
    width: '100%',
    height: 126,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  tailorName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#260101',
  },
  tailorSpecialty: {
    marginTop: 4,
    fontSize: 13,
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
    paddingVertical: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#260101',
  },
  productDescription: {
    marginTop: 2,
    fontSize: 13,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  productPrice: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
