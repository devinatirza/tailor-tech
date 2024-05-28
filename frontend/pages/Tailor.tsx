import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TailorScreen = () => {
  return (
    <View style={styles.container}>
      <Text>All Tailor Page</Text>
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

export default TailorScreen;
