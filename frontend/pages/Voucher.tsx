import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VoucherScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Your Voucher</Text>
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

export default VoucherScreen;

