import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CouponRedeemScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Coupon Redeem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CouponRedeemScreen;

