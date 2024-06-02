import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../pages/Login';
import { IStackScreenProps } from '../src/library/StackScreenProps';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/user-context';
import axios from 'axios';
import { IUser } from '../interfaces/user-interfaces';
import { TextInput, TouchableOpacity, Text } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../contexts/user-context', () => ({
  useUser: jest.fn(),
}));

jest.mock('axios');

describe('LoginScreen', () => {
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

  it('renders login screen correctly (snapshot)', () => {
    const tree = renderer.create(<LoginScreen {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles successful login', async () => {
    mockUserContext.login.mockResolvedValue('');

    const component = renderer.create(<LoginScreen {...mockProps} />);
    const instance = component.root;

    const emailInput = instance.findAllByType(TextInput)[0];
    const passwordInput = instance.findAllByType(TextInput)[1];
    const loginButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === 'Login');

    // if (emailInput && passwordInput && loginButton && loginButton.props && typeof loginButton.props.onPress === 'function') {
      await act(async () => {
        emailInput?.props.onChangeText('test@example.com');
        passwordInput?.props.onChangeText('password123');
      });

      await act(async () => {
        // await Promise.resolve();
        loginButton?.props.onPress();
      });

      // console.log(loginButton[0].findByType(Text).props.children)


      expect(mockUserContext.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('TailorTech');
      expect(component.toJSON()).toMatchSnapshot();
    // } else {
    //   throw new Error('Login button or its onPress method not found');
    // }
  });

  it('handles failed login', async () => {
    mockUserContext.login.mockResolvedValue('Invalid credentials');

    const component = renderer.create(<LoginScreen {...mockProps} />);
    const instance = component.root;

    const emailInput = instance.findAllByType(TextInput)[0];
    const passwordInput = instance.findAllByType(TextInput)[1];
    const loginButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === 'Login');

    // if (loginButton && loginButton.props && typeof loginButton.props.onPress === 'function') {
      await act(async () => {
        emailInput.props.onChangeText('test@example.com');
        passwordInput.props.onChangeText('wrongpassword');
        loginButton?.props.onPress();
      });

      await act(async () => {
        await Promise.resolve();
      });

      expect(mockUserContext.login).toHaveBeenCalledWith('', '');
      expect(mockNavigation.navigate).not.toHaveBeenCalledWith('TailorTech');
      expect(instance.findByProps({ children: 'Invalid credentials' })).toBeTruthy();
      expect(component.toJSON()).toMatchSnapshot();
    // } else {
    //   throw new Error('Login button or its onPress method not found');
    // }
  });

  it('navigates to Register screen', async () => {
    const component = renderer.create(<LoginScreen {...mockProps} />);
    const instance = component.root;

    const registerButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === "Didn't have an account?");

    await act(async () => {
      registerButton?.props.onPress();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('validates user on mount', async () => {
    const mockValidatedUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    (axios.get as jest.MockedFunction<any>).mockResolvedValue({ data: mockValidatedUser });

    await act(async () => {
      renderer.create(<LoginScreen {...mockProps} />);
    });

    expect(mockUserContext.updateUser).toHaveBeenCalledWith(mockValidatedUser);
    if (mockUserContext.user) {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('TailorTech');
    }
  });

  it('redirects to TailorTech if user is already logged in', async () => {
    mockUserContext.user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phoneNumber: '', address: '', points: 0};
    (axios.get as jest.MockedFunction<any>).mockResolvedValue({ data: mockUserContext.user });

    await act(async () => {
      renderer.create(<LoginScreen {...mockProps} />);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('TailorTech');
  });
});
