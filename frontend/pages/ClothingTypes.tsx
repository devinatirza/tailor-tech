import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from './HomeStack'; 

type ClothingTypesRouteProp = RouteProp<HomeStackParamList, 'Categories'>;

const clothingTypes = [
  { type: 'TOPS', basePrice: '' },
  { type: 'BOTTOMS', basePrice: '' },
  { type: 'DRESSES', basePrice: '' },
  { type: 'SUITS', basePrice: '' },
  { type: 'BAGS', basePrice: '' }
];

const ClothingTypes: React.FC = () => {
  const route = useRoute<ClothingTypesRouteProp>();
  const { specialities } = route.params;
  const [selected, setSelected] = useState<string | null>(null);

  const isSpeciality = (type: string) => {
    return specialities.some((speciality: { Category: string }) => speciality.Category.toUpperCase() === type);
  };

  const getPrice = (type: string) => {
    const speciality = specialities.find((speciality: { Category: string }) => speciality.Category.toUpperCase() === type);
    return speciality ? speciality.Price + 'K' : '';
  };

  const handleSelect = (type: string) => {
    setSelected(type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Clothing</Text>
      {clothingTypes.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.option, 
            selected === item.type ? styles.activeOption : isSpeciality(item.type) ? styles.specialityOption : styles.inactiveOption
          ]}
          onPress={() => handleSelect(item.type)}
          disabled={!isSpeciality(item.type)}
        >
          <View style={styles.optionContent}>
            <Text style={[
              styles.optionText, 
              selected === item.type ? styles.activeOptionText : isSpeciality(item.type) ? styles.specialityOptionText : styles.inactiveOptionText
            ]}>
              {item.type}
            </Text>
            {isSpeciality(item.type) && (
              <Text style={styles.basePriceText}>Base Price: {getPrice(item.type)}</Text>
            )}
          </View>
          {selected === item.type && (
            <Image source={require('../assets/selected_icon.png')} style={styles.selectedIcon} />
          )}
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.chooseButton}>
        <Text style={styles.chooseButtonText}>Choose</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 10,
    textAlign: 'center',
    color: '#260101',
  },
  option: {
    marginBottom: 25,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeOption: {
    borderColor: '#260101',
    backgroundColor: '#f0e2d0',
  },
  specialityOption: {
    borderColor: '#260101',
    backgroundColor: 'white',
  },
  inactiveOption: {
    borderColor: '#ccc',
    backgroundColor: '#f7f7f7',
  },
  optionContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeOptionText: {
    color: '#260101',
    fontWeight: 'bold',
  },
  specialityOptionText: {
    color: '#260101',
  },
  inactiveOptionText: {
    color: '#ccc',
  },
  basePriceText: {
    fontSize: width * 0.04,
    color: '#260101',
    textAlign: 'center',
  },
  selectedIcon: {
    width: width * 0.07,
    height: width * 0.07,
    tintColor: '#260101',
    marginRight: 10,
  },
  chooseButton: {
    backgroundColor: '#D9C3A9',
    marginHorizontal: width * 0.2,
    height: height * 0.06,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  chooseButtonText: {
    fontSize: width * 0.05,
    color: '#260101',
    fontWeight: 'bold',
  },
});

export default ClothingTypes;