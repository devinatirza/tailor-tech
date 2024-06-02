import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../pages/Login';
import { useUser } from '../contexts/user-context';
import axios from 'axios';

jest.mock('../contexts/user-context');
jest.mock('axios');

describe('LoginScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  const mockUserContext = {
    login: jest.fn(),
    updateUser: jest.fn(),
    user: null,
  };

  beforeEach(() => {
    useUser.mockReturnValue(mockUserContext);
    jest.clearAllMocks();
  });

  it('renders the login screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    expect(getByText('Welcome Back!')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText("Didn't have an account?")).toBeTruthy();
  });

  it('handles successful login', async () => {
    mockUserContext.login.mockResolvedValue('');

    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockUserContext.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('TailorTech');
    });
  });

  it('handles failed login', async () => {
    mockUserContext.login.mockResolvedValue('Invalid credentials');

    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockUserContext.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
      expect(getByText('Invalid credentials')).toBeTruthy();
      expect(mockNavigation.navigate).not.toHaveBeenCalledWith('TailorTech');
    });
  });

  it('navigates to Register screen', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.press(getByText("Didn't have an account?"));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });

  it('validates user on mount', async () => {
    const mockValidatedUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    axios.get.mockResolvedValue({ data: mockValidatedUser });

    render(<LoginScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(mockUserContext.updateUser).toHaveBeenCalledWith(mockValidatedUser);
    });

    if (!mockUserContext.user) {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('TailorTech');
    }
  });

  it('redirects to TailorTech if user is already logged in', async () => {
    mockUserContext.user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };

    render(<LoginScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('TailorTech');
    });
  });
});
