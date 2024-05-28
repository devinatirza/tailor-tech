import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useUser } from '../contexts/user-context';

interface InfoBlockProps {
  label: string;
  text: string;
  iconSrc: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ label, text, iconSrc }) => (
  <View style={styles.infoBlockContainer}>
    <View style={styles.infoBlockTextContainer}>
      <Text style={styles.infoBlockText}>{text}</Text>
    </View>
    <Image source={{ uri: iconSrc }} style={styles.infoBlockIcon} />
  </View>
);

const ProfileScreen = () => {
  const {user} = useUser()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {user.Name}!</Text>
        </View>
        <View style={styles.activeOrdersContainer}>
          <View style={styles.activeOrdersBox}>
            <Text style={styles.activeOrdersText}>0 Active Orders</Text>
          </View>
          <View style={styles.pointsBox}>
            <Text style={styles.pointsText}>{user.Points} Points</Text>
          </View>
        </View>
        <InfoBlock label="Name" text={user.Name} iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c112c2103c7a98a52ce75596428f3e8d2f19f9d72eceaa3218d7088702a1118d?apiKey=02c6ec15825a4577b249062a7a9dba94&" />
        <InfoBlock label="Email" text={user.Email} iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c112c2103c7a98a52ce75596428f3e8d2f19f9d72eceaa3218d7088702a1118d?apiKey=02c6ec15825a4577b249062a7a9dba94&" />
        <InfoBlock label="Phone" text={user.PhoneNumber} iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c112c2103c7a98a52ce75596428f3e8d2f19f9d72eceaa3218d7088702a1118d?apiKey=02c6ec15825a4577b249062a7a9dba94&" />
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressText}>{user.Address}</Text>
          </View>
          <Image source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/c112c2103c7a98a52ce75596428f3e8d2f19f9d72eceaa3218d7088702a1118d?apiKey=02c6ec15825a4577b249062a7a9dba94&" }} style={styles.addressIcon} />
        </View>
        <View style={styles.couponContainer}>
          <Text style={styles.couponText}>Your Coupon</Text>
        </View>
        <View style={styles.couponCodesContainer}>
          <View style={styles.couponCodeBox}>
            <Text style={styles.couponCodeText}>FZ1112</Text>
          </View>
          <View style={styles.couponCodeBox}>
            <Text style={styles.couponCodeText}>TZ0810</Text>
          </View>
        </View>
        <View style={styles.getCouponContainer}>
          <Text style={styles.getCouponText}>Get Another Coupon Code</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 7,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 32,
    alignSelf: 'center',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    color: '#F3EADE'
  },
  iconSubContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  welcomeContainer: {
    marginTop: 56,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: '#401201',
  },
  activeOrdersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  activeOrdersBox: {
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#4B2618',
    borderRadius: 10,
  },
  activeOrdersText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  pointsBox: {
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#4B2618",
    borderRadius: 10,
  },
  pointsText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  infoBlockContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: "#F3EADE",
    borderRadius: 20,
  },
  infoBlockTextContainer: {
    flex: 1,
  },
  infoBlockText: {
    fontSize: 18,
    color: "#260101",
  },
  infoBlockIcon: {
    width: 16,
    height: undefined,
    aspectRatio: 0.88,
    resizeMode: 'contain',
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 20,
    backgroundColor: "#F3EADE",
    borderRadius: 20,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 18,
    color: "#260101",
  },
  addressIcon: {
    width: 16,
    height: undefined,
    aspectRatio: 0.88,
    resizeMode: 'contain',
  },
  couponContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 66,
    marginBottom: 10,
    marginHorizontal: 44,
    backgroundColor: "#D9C3A9",
    borderRadius: 10,
    height: 50,
  },
  couponText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#260101",
    textAlign: "center",
  },
  couponCodesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  couponCodeBox: {
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 14,
    backgroundColor: "#4B2618",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  couponCodeText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  getCouponContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#401201",
  },
  getCouponText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#260101",
    textAlign: "center",
  },
});

export default ProfileScreen;
