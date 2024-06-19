import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IProduct } from '../interfaces/product-interfaces';

interface CartCardProps {
  product: IProduct;
  onRemove: (productId: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({ product, onRemove }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.ImgUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.Product}</Text>
        <Text style={styles.productSize}>Size - {product.Size}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>IDR {product.Price}K</Text>
        <TouchableOpacity onPress={() => onRemove(product.ID)}>
          <Image source={require('../assets/delete_icon.png')} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 22,
    color: '#260101',
    fontWeight: 'bold'
  },
  productSize: {
    fontSize: 18,
    color: '#260101',
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 18,
    color: '#260101',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
});

export default CartCard;
