import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useUser } from '../contexts/user-context';
import CartCard from './CartCard';
import { ICart } from '../interfaces/product-interfaces';

const CartScreen: React.FC = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<ICart>({ TotalPrice: 0, Products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/carts/get-cart/${user.ID}`);
        if (response.data.message === "Your cart is empty") {
          setCartItems({ TotalPrice: 0, Products: [] });
        } else {
          setCartItems(response.data);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user.ID]);

  const groupItemsByTailor = (items: ICart) => {
    const groupedItems: { [key: string]: ICart['Products'] } = {};

    items.Products.forEach((item) => {
      if (!groupedItems[item.Tailor]) {
        groupedItems[item.Tailor] = [];
      }
      groupedItems[item.Tailor].push(item);
    });

    return groupedItems;
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8000/carts/remove`, {
        data: { userId: user.ID, productId },
      });
      setCartItems((prev) => ({
        TotalPrice: prev.TotalPrice - prev.Products.find((item) => item.ID === productId)?.Price!,
        Products: prev.Products.filter((item) => item.ID !== productId),
      }));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item from cart');
    }
  };

  const groupedCartItems = groupItemsByTailor(cartItems);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Cart</Text>
        <View style={styles.cartQuantityCircle}>
          <Text style={styles.cartQuantityText}>{cartItems.Products.length}</Text>
        </View>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Shipping Address</Text>
        <Text style={styles.address}>{user.Address}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {Object.keys(groupedCartItems).length > 0 ? (
          Object.keys(groupedCartItems).map((tailor) => (
            <View key={tailor} style={styles.tailorSection}>
              <Text style={styles.tailorName}>{tailor}</Text>
              {groupedCartItems[tailor].map((item) => (
                <CartCard key={item.ID} product={item} onRemove={handleRemoveFromCart} />
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        )}
      </ScrollView>
      {cartItems.Products.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>
              IDR {cartItems.TotalPrice}K
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const { width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'white',
padding: 30,
},
headerContainer: {
flexDirection: 'row',
alignItems: 'center',
marginTop: 5,
marginBottom: 20,
},
title: {
fontSize: deviceWidth * 0.1,
fontWeight: 'bold',
color: '#260101',
},
cartQuantityCircle: {
marginLeft: 10,
backgroundColor: '#D9C3A9',
borderRadius: 15,
width: 30,
height: 30,
justifyContent: 'center',
alignItems: 'center',
},
cartQuantityText: {
fontSize: 16,
color: '#260101',
fontWeight: 'bold',
},
addressContainer: {
backgroundColor: '#F3EADE',
padding: 15,
borderRadius: 8,
marginBottom: 20,
},
addressLabel: {
fontSize: 22,
color: '#260101',
marginBottom: 5,
fontWeight: 'bold',
},
address: {
fontSize: 16,
},
scrollView: {
marginBottom: 20,
},
tailorSection: {
marginBottom: 20,
},
tailorName: {
fontSize: 26,
fontWeight: 'bold',
color: '#260101',
marginBottom: 10,
},
cartContainer: {
paddingBottom: 20,
},
emptyCartText: {
fontSize: 18,
color: '#260101',
textAlign: 'center',
marginTop: 50,
},
checkoutContainer: {
paddingHorizontal: 10,
},
totalContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 20,
},
totalLabel: {
fontSize: 20,
fontWeight: '600',
color: '#260101',
},
totalPrice: {
fontSize: 24,
fontWeight: 'bold',
color: '#260101',
},
checkoutButton: {
backgroundColor: '#D9C3A9',
borderRadius: 50,
paddingVertical: 15,
paddingHorizontal: 70,
alignSelf: 'center',
marginTop: 10,
},
checkoutButtonText: {
fontSize: deviceWidth * 0.05,
color: '#260101',
fontWeight: 'bold',
},
});

export default CartScreen;