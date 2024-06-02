import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ITailor } from '../interfaces/tailor-interfaces';

const TailorCard: React.FC<{ tailor: ITailor }> = ({ tailor }) => (
  <View style={styles.tailorItem}>
    <Image source={{ uri: tailor.ImgUrl }} style={styles.tailorImage} />
    <Text style={styles.tailorName}>{tailor.Name}</Text>
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

const TailorScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tailors, setTailors] = useState<ITailor[]>([]);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [searchQuery, setSearchQuery] = useState('');

  async function fetchTailors(query = '') {
    try {
      const response = await axios.get(`http://localhost:8000/tailors/get-all`, {
        params: { query },
      });
      setTailors(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTailors();
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => {
      subscription?.remove();
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchTailors(query);
  };

  const numColumns = 2;
  const itemWidth = screenWidth / numColumns - 40; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tailors</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Image source={{ uri: '../assets/searchbar.png' }} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Tailors..."
            placeholderTextColor="#260101" 
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={tailors}
        renderItem={({ item }) => <TailorCard tailor={item} />}
        keyExtractor={(item) => item.ID.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.tailorsContainer}
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
    backgroundColor: '#F3EADE', 
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
  tailorsContainer: {
    paddingBottom: 10,
  },
  tailorItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    width: (Dimensions.get('window').width / 2) - 40, 
  },
  tailorImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 4 / 3,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  tailorName: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#260101',
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
  icon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
});

export default TailorScreen;
