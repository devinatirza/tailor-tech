import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useUser } from '../contexts/user-context';
import { useNavigation } from '@react-navigation/native';

interface CouponProps {
  code: string;
}

interface PointsProps {
  points: number;
}

interface ButtonProps {
  text: string;
  style: object;
  textStyle: object;
}

const Coupon: React.FC<CouponProps> = ({ code }) => (
  <View style={styles.couponContainer}>
    <Image source={{ uri: '../assets/couponIcon.png' }} style={styles.couponBackground} />
    <Text style={styles.couponText}>{code}</Text>
  </View>
);

const Points: React.FC<PointsProps> = ({ points }) => (
  <View style={styles.pointsContainer}>
    <Text style={styles.pointsLabel}>You Have</Text>
    <View style={styles.pointsValueContainer}>
      <Text style={styles.pointsValue}>{points} </Text>
      <Text style={styles.pointsValuePoints}>Points</Text>
    </View>
  </View>
);

const Button: React.FC<ButtonProps> = ({ text, style, textStyle }) => (
  <TouchableOpacity style={[styles.buttonContainer, style]}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

const CouponCodeScreen: React.FC = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  console.log(user);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Apply your coupon code on the payment page to unlock a special discount and enhance your shopping experience</Text>
      </View>
      <Button text="Your Coupon" style={styles.couponButton} textStyle={styles.couponButtonText} />
      <View style={styles.couponsContainer}>
        <Coupon code="FZ1112" />
        <Coupon code="FD0809" />
      </View>
      <Points points={user.Points} />
      <TouchableOpacity 
        style={styles.anotherCouponButton} 
        onPress={() => navigation.navigate('Coupon Redeem')}
      >
        <Text style={styles.anotherCouponButtonText}>Get Another Coupon Code</Text>
      </TouchableOpacity> 
    </ScrollView>
  );
};

const { width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: deviceWidth * 0.1,
    paddingTop: 20,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: deviceWidth * 0.045,
    color: '#260101',
  },
  couponContainer: {
    width: deviceWidth * 0.8,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
    position: 'relative',
  },
  couponBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  couponText: {
    color: '#260101',
    fontSize: 24,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  pointsLabel: {
    color: '#260101',
    fontSize: 20,
    paddingRight: 5,
  },
  pointsValueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#4B2618',
  },
  pointsValue: {
    color: 'white',
    fontSize: 20,
  },
  pointsValuePoints: {
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 22,
  },
  couponButton: {
    backgroundColor: '#4B2618',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  couponButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  couponsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  anotherCouponButton: {
    backgroundColor: '#D9C3A9',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 15,
  },
  anotherCouponButtonText: {
    color: '#260101',
    fontSize: 20,
  },
});

export default CouponCodeScreen;
