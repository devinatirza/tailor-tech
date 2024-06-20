import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useUser } from '../contexts/user-context';
import { NavigationProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { ProfileStackParamList } from './ProfileStack';

type Navigation = NavigationProp<ProfileStackParamList, 'UpdateProfile' | 'FAQs' | 'CouponCode'>;

const OptionItem: React.FC<{ text: string; iconSrc: any }> = ({ text, iconSrc }) => (
  <View style={styles.optionItemContainer}>
    <Image source={iconSrc} style={styles.optionItemImage} />
    <View style={styles.optionItemTextContainer}>
      <Text style={styles.optionItemText}>{text}</Text>
    </View>
    <Image source={require('../assets/arrowIcon.png')} style={styles.optionItemIcon} />
  </View>
);

const ProfileScreen = () => {
  const { updateUser, user } = useUser();
  const navigation = useNavigation<Navigation>();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!user) {
      console.error('Logout error: User is not logged in');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/logout', {
        withCredentials: true,
      });
      if (response.status === 200) {
        if (Platform.OS === 'web') {
          document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        navigation.navigate('Role');
        updateUser(null); 
      } else {
        console.error('Logout error:', response.data);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${user.ID}`);
      if (response.status === 200) {
        updateUser(response.data.user);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  useEffect(() => {
    fetchUserDetails()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserDetails();
    }, 60000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileContent}>
            <View style={styles.profileImageContainer}>
              <Image source={require('../assets/profileIcon.png')} style={styles.profileImage} />
              <Text style={styles.profileName}>{user?.Name}</Text>
              <Text style={styles.profileEmail}>{user?.Email}</Text>
              <View style={styles.profileStatsBox}>
                <View style={styles.profileStatsContainer}>
                  <Text style={styles.profileMoney}>IDR {user?.Money}K</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')} style={styles.editProfileButton}>
                <Text style={styles.editProfileButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CouponCode')}>
            <OptionItem text="Coupon Code" iconSrc={require('../assets/voucherIcon.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FAQs')}>
            <OptionItem text="FAQs" iconSrc={require('../assets/faqIcon.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.logoutContainer}>
            <Image source={require('../assets/logoutIcon.png')} style={styles.logoutImage} />
            <View style={styles.logoutTextContainer}>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: deviceWidth * 0.1,
    width: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 54,
  },
  profileContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: deviceWidth * 0.4,
    height: deviceWidth * 0.4,
  },
  profileName: {
    marginTop: 11,
    fontSize: deviceWidth * 0.09,
    fontWeight: '600',
    textAlign: 'center',
    color: '#593825',
  },
  profileEmail: {
    fontSize: deviceWidth * 0.05,
    color: '#260101',
    textAlign: 'center',
  },
  profileStatsBox: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  profileStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  profileMoney: {
    fontSize: deviceWidth * 0.055,
    color: '#260101',
    textAlign: 'center',
    fontWeight: '600',
  },
  editProfileButton: {
    justifyContent: 'center',
    paddingHorizontal: 56,
    paddingVertical: 20,
    marginTop: 24,
    borderRadius: 9999,
    backgroundColor: '#D9C3A9',
  },
  editProfileButtonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#260101',
  },
  optionsContainer: {
    paddingTop: 0,
  },
  optionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  optionItemImage: {
    width: 45,
    height: 45,
    padding: 10,
  },
  optionItemTextContainer: {
    flex: 1,
  },
  optionItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#260101',
    marginLeft: 20,
  },
  optionItemIcon: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 10,
    gap: 16,
    paddingBottom: 30,
  },
  logoutImage: {
    width: 45,
    height: 45,
    padding: 10,
  },
  logoutTextContainer: {
    flex: 1,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#AC1A1A',
  },
});

export default ProfileScreen;
