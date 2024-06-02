import React from 'react';
import renderer, { act } from 'react-test-renderer';
import RegisterScreen from '../pages/Register';
import { IStackScreenProps } from '../src/library/StackScreenProps';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/user-context';
import axios from 'axios';
import { IUser } from '../interfaces/user-interfaces';
import { TextInput, TouchableOpacity, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../contexts/user-context', () => ({
  useUser: jest.fn(),
}));

jest.mock('axios');

jest.mock('react-native-elements', () => {
  // const originalModule = jest.requireActual('react-native-elements');

  const mockCheckBox = ({ checked, disabled, checkedColor }: { checked: boolean; disabled?: boolean; checkedColor?: string }) => (
    <input type="checkbox" checked={checked} disabled={disabled} style={{ color: checkedColor }} />
  );

  return {
    // ...originalModule,
    CheckBox: mockCheckBox,
  };
});

describe('RegisterScreen', () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockUserContext = {
    login: jest.fn() as jest.MockedFunction<any>,
    updateUser: jest.fn() as jest.MockedFunction<any>,
    user: null as IUser | null,
  };

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockUserContext);
    jest.clearAllMocks();
  });

  const mockProps: IStackScreenProps = {
    navigation: mockNavigation,
    route: {},
    nameProp: 'TestName',
  };

  it('renders register screen correctly (snapshot)', () => {
    const tree = renderer.create(<RegisterScreen {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles successful registration', async () => {
    (axios.post as jest.MockedFunction<any>).mockResolvedValue({ status: 200 });

    const component = renderer.create(<RegisterScreen {...mockProps} />);
    const instance = component.root;

    const textInputs = instance.findAllByType(TextInput);
    const nameInput = textInputs.find(node => node.props.placeholder === 'Name');
    const emailInput = textInputs.find(node => node.props.placeholder === 'Email');
    const passwordInput = textInputs.find(node => node.props.placeholder === 'Password');
    const confirmPasswordInput = textInputs.find(node => node.props.placeholder === 'Confirm Password');
    const phoneNumberInput = textInputs.find(node => node.props.placeholder === 'Phone Number');
    const addressInput = textInputs.find(node => node.props.placeholder === 'Address');
    const registerButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === 'Register');

    await act(async () => {
      nameInput?.props.onChangeText('John Doe');
      emailInput?.props.onChangeText('john.doe@example.com');
      passwordInput?.props.onChangeText('Password123!');
      confirmPasswordInput?.props.onChangeText('Password123!');
      phoneNumberInput?.props.onChangeText('1234567890');
      addressInput?.props.onChangeText('123 Main St');
    });

    await act(async () => {
      registerButton?.props.onPress();
    });

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/register",
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        confirm: 'Password123!',
        phoneNumber: '1234567890',
        address: '123 Main St',
      }
    );

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('handles failed registration', async () => {
    const component = renderer.create(<RegisterScreen {...mockProps} />);
    const instance = component.root;

    const nameInput = instance.findAllByType(TextInput).find(node => node.props.placeholder === 'Name');
    const emailInput = instance.findAllByType(TextInput).find(node => node.props.placeholder === 'Email');
    const passwordInput = instance.findAllByType(TextInput).find(node => node.props.placeholder === 'Password');
    const confirmPasswordInput = instance.findAllByType(TextInput).find(node => node.props.placeholder === 'Confirm Password');
    const phoneNumberInput = instance.findAllByType(TextInput).find(node => node.props.placeholder === 'Phone Number');
    const addressInput = instance.findAllByType(TextInput).find(node => node.props.placeholder === 'Address');
    const registerButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === 'Register');

    await act(async () => {
      nameInput?.props.onChangeText('John 1');
      emailInput?.props.onChangeText('john.doe@example.com');
      passwordInput?.props.onChangeText('Password123!');
      confirmPasswordInput?.props.onChangeText('Password123!');
      phoneNumberInput?.props.onChangeText('1234567890');
      addressInput?.props.onChangeText('123 Main St');
    });

      (axios.post as jest.MockedFunction<any>).mockRejectedValue({
      response: { data: { error: 'Name must not contain symbols or numbers' } }
    });

    await act(async () => {
      registerButton?.props.onPress();
    });

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/register", expect.objectContaining({
      name: 'John 1',
      email: 'john.doe@example.com',
      password: 'Password123!',
      confirm: 'Password123!',
      phoneNumber: '1234567890',
      address: '123 Main St'
    }));

    const errorMessage = instance.findAllByType(Text).find(node => node.props.children === 'Name must not contain symbols or numbers');
    // const errorMessage = instance.findByProps({ children: 'Name must not contain symbols or numbers' });
    expect(errorMessage).toBeTruthy();
  });

  it('validates password input correctly', () => {
    const component = renderer.create(<RegisterScreen {...mockProps} />);
    const instance = component.root;

    const passwordInput = instance.findAllByType(TextInput).find(node => node.props.placeholder === 'Password');
    // const passwordInput = instance.findByProps({ placeholder: 'Password' });

    act(() => {
      passwordInput?.props.onChangeText('Pass123!');
    });

    expect(passwordInput?.props.value).toBe('Pass123!');

    const requirements = instance.findAllByProps({ children: 'Password Requirements:' });
    expect(requirements).toBeTruthy();
  });
});
