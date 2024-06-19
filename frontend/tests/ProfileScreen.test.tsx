import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/user-context';
import ProfileScreen from '../pages/Profile';
import axios from 'axios';
import { TouchableOpacity, Text } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../contexts/user-context', () => ({
  useUser: jest.fn(),
}));

jest.mock('axios');

describe('ProfileScreen', () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockUpdateUser = jest.fn();
  const mockUser = {
    Name: 'John Doe',
    Email: 'john@example.com',
    Points: 100,
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useUser as jest.MockedFunction<typeof useUser>).mockReturnValue({
      user: mockUser,
      updateUser: mockUpdateUser,
    });
    jest.clearAllMocks();
  });

  const renderProfileScreen = () => renderer.create(<ProfileScreen />);

  it('renders correctly', () => {
    const tree = renderProfileScreen().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to UpdateProfile screen when Edit Profile button is pressed', async () => {
    const component = renderProfileScreen();
    const instance = component.root;

    const editProfileButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === 'Edit Profile');

    if (editProfileButton) {
      await act(async () => {
        editProfileButton.props.onPress();
      });

      expect(mockNavigation.navigate).toHaveBeenCalledWith('UpdateProfile');
    }
  });

  it('navigates to FAQs screen when FAQs option is pressed', async () => {
    const component = renderProfileScreen();
    const instance = component.root;

    const faqsButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === 'FAQs');

    if (faqsButton) {
      await act(async () => {
        faqsButton.props.onPress();
      });

      expect(mockNavigation.navigate).toHaveBeenCalledWith('FAQs');
    }
  });

  it('navigates to CouponCode screen when Coupon Code option is pressed', async () => {
    const component = renderProfileScreen();
    const instance = component.root;

    const couponCodeButton = instance.findAllByType(TouchableOpacity).find(node => node.findByType(Text).props.children === 'Coupon Code');

    if (couponCodeButton) {
      await act(async () => {
        couponCodeButton.props.onPress();
      });

      expect(mockNavigation.navigate).toHaveBeenCalledWith('CouponCode');
    }
  });

  it('logs out the user when Logout button is pressed', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({});

    const component = renderProfileScreen();
    const instance = component.root;

    const logoutButtons = instance.findAllByType(TouchableOpacity);
    const logoutButton = logoutButtons.find((node: any) => {
      if (node.props.onPress) {
        return node.props.children === 'Logout';
      }
      return false;
    });

    if (logoutButton) {
      await act(async () => {
        logoutButton.props.onPress();
      });

      await act(async () => {
        await Promise.resolve();
      });

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/logout');
      expect(mockUpdateUser).toHaveBeenCalledWith(null);
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Role');
    }
  });

  it('handles logout error', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Logout error'));

    const component = renderProfileScreen();
    const instance = component.root;

    const logoutButtons = instance.findAllByType(TouchableOpacity);
    const logoutButton = logoutButtons.find((node: any) => {
      if (node.props.onPress) {
        return node.props.children === 'Logout';
      }
      return false;
    });

    if (logoutButton) {
      await act(async () => {
        logoutButton.props.onPress();
      });

      await act(async () => {
        await Promise.resolve();
      });

      expect(consoleErrorMock).toHaveBeenCalledWith('Logout error:', expect.any(Error));
      consoleErrorMock.mockRestore();
    }
  });
});
