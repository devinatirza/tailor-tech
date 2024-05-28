import * as React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useUser } from '../contexts/user-context';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const OptionItem: React.FC<{ text: string; iconSrc: any }> = ({ text, iconSrc }) => (
  <View style={styles.optionItemContainer}>
    <Image source={iconSrc} style={styles.optionItemImage} />
    <View style={styles.optionItemTextContainer}>
      <Text style={styles.optionItemText}>{text}</Text>
    </View>
    <Image source={{ uri: '../assets/arrowIcon.png' }} style={styles.optionItemIcon} />
  </View>
);

const ProfileScreen = () => {
  const { updateUser, user } = useUser();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout');
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.profileText}>Profile</Text>
        <View style={styles.profileContainer}>
          <View style={styles.profileContent}>
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: '../assets/profileIcon.png' }} style={styles.profileImage} />
              <Text style={styles.profileName}>
                {user.Name}
              </Text>
              <Text style={styles.profileEmail}>
                {user.Email}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Update Profile')} style={styles.editProfileButton}>
                <Text style={styles.editProfileButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Vouchers')}>
            <OptionItem text="Voucher" iconSrc={{ uri: '../assets/voucherIcon.png' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FAQs')}>
          <OptionItem text="FAQs" iconSrc={{ uri: '../assets/faqIcon.png' }} />
          </TouchableOpacity>   
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.logoutContainer}>
            <Image source={{ uri: '../assets/logoutIcon.png' }} style={styles.logoutImage} />
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
    paddingTop: 28,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: 480,
    backgroundColor: 'white',
    borderRadius: 32,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: deviceWidth * 0.1,
    width: '100%',
  },
  profileText: {
    fontSize: deviceWidth * 0.09,
    fontWeight: 'bold',
    marginTop: 35,
    color: '#260101',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 44,
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
    marginTop: 14,
    fontSize: deviceWidth * 0.07,
    fontWeight: '500',
    textAlign: 'center',
    color: '#260101',
  },
  profileEmail: {
    fontSize: deviceWidth * 0.05,
    color: '#260101',
    textAlign: 'center',
    marginTop: 5,
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
    fontSize: 18,
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
