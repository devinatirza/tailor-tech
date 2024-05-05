import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { IStackScreenProps } from '../src/library/StackScreenProps';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

// interface Tailor {
//   id: string;
//   name: string;
//   email: string;
// }

// interface Styles {
//   container: ViewStyle;
//   text: TextStyle;
//   searchBarContainer: ViewStyle;
//   searchBar: TextStyle;
//   tailorContainer: ViewStyle;
//   tailorName: TextStyle;
// }

// const styles = StyleSheet.create<Styles>({
//   container: {
//     flex: 1,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   searchBarContainer: {
//     width: '80%',
//     marginHorizontal: 20,
//     marginTop: 10,
//   },
//   searchBar: {
//     height: 40,
//     width: '100%',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingLeft: 15,
//     ...Platform.select({
//       ios: {
//         backgroundColor: 'transparent',
//         borderBottomColor: 'transparent',
//         shadowColor: 'transparent',
//       },
//       android: {
//         elevation: 0,
//       },
//     }),
//   },
//   tailorContainer: {
//     width: '80%',
//     marginBottom: 10,
//   },
//   tailorName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// const HomeScreen = () => {
//   const navigation = useNavigation<any>();
//   const [tailors, setTailors] = useState<Tailor[]>([]);
//   const [searchText, setSearchText] = useState('');
//   const [isFocused, setIsFocused] = useState(false);

//   useEffect(() => {
//     const fetchTailors = async () => {
//       try {
//         const response = await axios.get('https://your-api-url.com/tailors');
//         setTailors(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTailors();
//   }, []);

//   const renderTailor = ({ item }: { item: Tailor }) => {
//     return (
//       <View style={styles.tailorContainer}>
//         <Text style={styles.tailorName}>{item.name}</Text>
//       </View>
//     );
//   };

//   const filteredTailors = tailors.filter((tailor) =>
//     tailor.name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={{ paddingTop: 10 }}>
//           <View style={styles.searchBarContainer}>
//             <TextInput
//               style={[styles.searchBar, { borderColor: isFocused ? '#401201' : '#CCCCCC' }]}
//               placeholder="Search tailors..."
//               onChangeText={(text) => setSearchText(text)}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//             />
//           </View>
//           <FlatList
//             data={filteredTailors}
//             renderItem={renderTailor}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={{ paddingBottom: 10 }}
//           />
//           <StatusBar style="auto" />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

const FavoriteScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // navigation.navigate('Favorite');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        {/* <Image
          source={require('D:\\Tezet\\AOL SoftEng\\AOL\\frontend\\assets\\fav_icon.png')}
          style={styles.favoriteIcon}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 0,
    right: 20,
    padding: 10,
  },
});

export default FavoriteScreen;