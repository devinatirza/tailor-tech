import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useUser } from '../contexts/user-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from "axios";
import { ProfileStackParamList } from "./ProfileStack";

type Navigation = NavigationProp<ProfileStackParamList, 'CouponRedeem'>;

interface CouponProps {
  code: string;
  quantity: number;
}

interface PointsProps {
  points: number;
}

interface ButtonProps {
  text: string;
  style: object;
  textStyle: object;
}

const Coupon: React.FC<CouponProps> = ({ code, quantity }) => (
  <View style={styles.couponWrapper}>
    {quantity > 1 && <Text style={styles.quantityText}>{quantity}x</Text>}
    <View style={styles.couponContainer}>
      <Image source={{ uri: '../assets/couponIcon.png' }} style={styles.couponBackground} />
      <Text style={styles.couponText}>{code}</Text>
    </View>
  </View>
);

const Points: React.FC<PointsProps> = ({ points }) => (
  <View style={styles.pointsContainer}>
    <Text style={styles.pointsLabel}>You Have</Text>
    <View style={styles.pointsValueContainer}>
      <Text style={styles.pointsValue}>{points}</Text>
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
  const navigation = useNavigation<Navigation>();
  const [coupons, setCoupons] = useState<{ PromoCode: string, Quantity: number }[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/coupons/code', {
          params: { userId: user.ID }
        });
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error('Failed to fetch user coupons', error);
      }
    };

    if (user) {
      fetchCoupons();
    }
  }, [user]);

  const hasCoupons = coupons.length > 0;
  const buttonText = hasCoupons ? "Get Another Coupon Code" : "Get Coupon Code";
  const emptyMessage = "You don't have a coupon yet. Start shopping to earn your first coupon!";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Apply your coupon code on the payment page to unlock a special discount and enhance your shopping experience</Text>
      </View>
      <Button text="Your Coupon" style={styles.couponButton} textStyle={styles.couponButtonText} />
      <View style={styles.couponsContainer}>
        {hasCoupons ? (
          coupons.map(({ PromoCode, Quantity }) => (
            <Coupon key={PromoCode} code={PromoCode} quantity={Quantity} />
          ))
        ) : (
          <Text style={styles.emptyMessage}>{emptyMessage}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.anotherCouponButton} 
        onPress={() => navigation.navigate('CouponRedeem')}
      >
        <Text style={styles.anotherCouponButtonText}>{buttonText}</Text>
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
  couponWrapper: {
    width: deviceWidth * 0.8,
    marginVertical: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: '#4B2618',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 18,
    zIndex: 1,
  },
  couponContainer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  couponBackground: {
    width: '95%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  couponText: {
    color: '#260101',
    fontSize: 24,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#260101',
    textAlign: 'center',
    marginTop: 20,
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
    marginTop: 35,
    marginBottom: 30,
  },
  anotherCouponButtonText: {
    color: '#260101',
    fontSize: 20,
  },
});

export default CouponCodeScreen;
