import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../pages/Register';
import axios from 'axios';

jest.mock('axios');

describe('RegisterScreen', () => {
  it('test_handleRegister_successfulRegistration', async () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText } = render(<RegisterScreen navigation={mockNavigation} />);
    
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const addressInput = getByPlaceholderText('Address');
    const registerButton = getByText('Register');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(passwordInput, 'Password123!');
    fireEvent.changeText(confirmPasswordInput, 'Password123!');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.changeText(addressInput, '123 Main St');

    axios.post.mockResolvedValue({ status: 200 });

    fireEvent.press(registerButton);

    await waitFor(() => expect(mockNavigation.navigate).toHaveBeenCalledWith('Login'));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/register", expect.objectContaining({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      confirm: 'Password123!',
      phoneNumber: '1234567890',
      address: '123 Main St'
    }));
  });

  it('test_handleRegister_apiFailure', async () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText } = render(<RegisterScreen navigation={mockNavigation} />);
    
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const addressInput = getByPlaceholderText('Address');
    const registerButton = getByText('Register');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(passwordInput, 'Password123!');
    fireEvent.changeText(confirmPasswordInput, 'Password123!');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.changeText(addressInput, '123 Main St');

    axios.post.mockRejectedValue({ response: { data: { error: 'Failed to register' } } });

    fireEvent.press(registerButton);

    await waitFor(() => expect(getByText('Failed to register')).toBeTruthy());

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/register", expect.objectContaining({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      confirm: 'Password123!',
      phoneNumber: '1234567890',
      address: '123 Main St'
    }));
  });

  it('test_handlePasswordChange_validations', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={{ navigate: jest.fn() }} />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'Pass123!');

    expect(passwordInput.props.value).toBe('Pass123!');
    expect(getByText('Password Requirements:')).toBeTruthy();
    expect(getByText('Mininum 8 characters')).toBeTruthy();
    expect(getByText('At least one uppercase and lowercase letter')).toBeTruthy();
    expect(getByText('At least one number and special character')).toBeTruthy();
  });
});
