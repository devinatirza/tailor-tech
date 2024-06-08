import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { useUser } from '../contexts/user-context';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

interface InfoBlockProps {
  label: string;
  text: string;
  isEditing: boolean;
  iconSrc: string;
  secureTextEntry?: boolean;
  onEdit: () => void;
  onChangeText: (text: string) => void;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ label, text, isEditing, iconSrc, secureTextEntry, onEdit, onChangeText }) => (
  <View style={styles.infoBlockContainer}>
    <TextInput
      style={[styles.infoBlockText, { backgroundColor: '#F3EADE' }]}
      value={text}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholder={label}
      editable={isEditing}
    />
    <TouchableOpacity onPress={onEdit}>
      <Image source={{ uri: iconSrc }} style={styles.infoBlockIcon} />
    </TouchableOpacity>
  </View>
);

const UpdateProfileScreen = () => {
  const { user, updateUser } = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState(user.Name);
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user.PhoneNumber);
  const [address, setAddress] = useState(user.Address);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [validations, setValidations] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setValidations({
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[~`!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/.test(value),
    });
  };

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const updatedUser: any = {
      userId: user.ID,
      name,
      email,
      phoneNumber,
      address,
      points: user.Points,
    };

    if (password) {
      updatedUser.password = password;
      updatedUser.confirm = confirmPassword;
    }

    try {
      const response = await axios.post('http://localhost:8000/update-profile', updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      if (response.status !== 200) {
        Alert.alert('Error', result.error);
      } else {
        updateUser(result.user);
        Alert.alert('Success', 'Profile updated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>
        <InfoBlock
          label="Name"
          text={name}
          isEditing={isEditingName}
          iconSrc="../assets/pencilIcon.png"
          onEdit={() => setIsEditingName(!isEditingName)}
          onChangeText={setName}
        />
        <InfoBlock
          label="Email"
          text={email}
          isEditing={isEditingEmail}
          iconSrc="../assets/pencilIcon.png"
          onEdit={() => setIsEditingEmail(!isEditingEmail)}
          onChangeText={setEmail}
        />
        <InfoBlock
          label="Password"
          text={password}
          isEditing={isEditingPassword}
          iconSrc="../assets/pencilIcon.png"
          secureTextEntry={true}
          onEdit={() => setIsEditingPassword(!isEditingPassword)}
          onChangeText={handlePasswordChange}
        />
        {isEditingPassword && (
          <>
            <View style={styles.passwordRequirements}>
              <CheckBox
                title="Minimum 8 characters"
                checked={validations.minLength}
                textStyle={validations.minLength ? styles.valid : styles.invalid}
                containerStyle={styles.checkBoxContainer}
                disabled
              />
              <CheckBox
                title="At least one uppercase letter"
                checked={validations.uppercase}
                textStyle={validations.uppercase ? styles.valid : styles.invalid}
                containerStyle={styles.checkBoxContainer}
                disabled
              />
              <CheckBox
                title="At least one lowercase letter"
                checked={validations.lowercase}
                textStyle={validations.lowercase ? styles.valid : styles.invalid}
                containerStyle={styles.checkBoxContainer}
                disabled
              />
              <CheckBox
                title="At least one digit"
                checked={validations.digit}
                textStyle={validations.digit ? styles.valid : styles.invalid}
                containerStyle={styles.checkBoxContainer}
                disabled
              />
              <CheckBox
                title="At least one special character"
                checked={validations.specialChar}
                textStyle={validations.specialChar ? styles.valid : styles.invalid}
                containerStyle={styles.checkBoxContainer}
                disabled
              />
            </View>
            <View style={styles.infoBlockContainer}>
              <TextInput
                style={[styles.infoBlockText, { backgroundColor: '#F3EADE' }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                placeholder="Confirm Password"
              />
            </View>
          </>
        )}
        <InfoBlock
          label="Phone Number"
          text={phoneNumber}
          isEditing={isEditingPhoneNumber}
          iconSrc="../assets/pencilIcon.png"
          onEdit={() => setIsEditingPhoneNumber(!isEditingPhoneNumber)}
          onChangeText={setPhoneNumber}
        />
        <InfoBlock
          label="Address"
          text={address}
          isEditing={isEditingAddress}
          iconSrc="../assets/pencilIcon.png"
          onEdit={() => setIsEditingAddress(!isEditingAddress)}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSave}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  innerContainer: {
    marginHorizontal: 30,
  },
  titleContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  titleText: {
    color: '#401201',
    fontSize: screenWidth * 0.08,
    fontWeight: 'bold',
  },
  infoBlockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBlockText: {
    flex: 1,
    padding: 10,
    borderColor: '#401201',
    borderWidth: 1,
    borderRadius: 5,
  },
  infoBlockIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  passwordRequirements: {
    marginBottom: 20,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  valid: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
  buttonContainer: {
    backgroundColor: '#D9C3A9',
    marginHorizontal: 50,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonContainer: {
    marginTop: 30,
    backgroundColor: '#D9C3A9',
    marginHorizontal: 50,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#260101',
    fontWeight: 'bold',
  },
});

export default UpdateProfileScreen;
