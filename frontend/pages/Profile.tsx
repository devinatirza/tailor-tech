import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../contexts/user-context';

const ProfileScreen = () => {

  const {user} = useUser()
  return (
    <View style={styles.container}>
      <Text>Welcome, {user.Name}</Text>
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

export default ProfileScreen;
