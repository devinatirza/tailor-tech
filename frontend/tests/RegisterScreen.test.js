import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../pages/Register';
import axios from 'axios';

jest.mock('axios');

describe('RegisterScreen', () => {
  it('test_handleRegister_successfulRegistration', async () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    const registerButton = getByText('Register');

    axios.post.mockResolvedValue({ data: { message: 'Registration successful' } });

    fireEvent.press(registerButton);

    await new Promise(process.nextTick); // Wait for promises to resolve

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/register", expect.any(Object));
    expect(getByText('Registration successful')).toBeTruthy();
  });

  it('test_handleRegister_apiFailure', async () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<RegisterScreen navigation={mockNavigation} />);
    const registerButton = getByText('Register');

    axios.post.mockRejectedValue({ response: { data: { error: 'Failed to register' } } });

    fireEvent.press(registerButton);

    await new Promise(process.nextTick); // Wait for promises to resolve

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/register", expect.any(Object));
    expect(getByText('Failed to register')).toBeTruthy();
  });

  it('test_handlePasswordChange_validations', () => {
    const { getByPlaceholderText } = render(<RegisterScreen navigation={{ navigate: jest.fn() }} />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'Pass123!');

    expect(passwordInput.props.value).toBe('Pass123!');
    expect(getByPlaceholderText('Password Requirements:')).toBeTruthy();
    expect(getByText('Mininum 8 characters')).toBeTruthy();
    expect(getByText('At least one uppercase and lowercase letter')).toBeTruthy();
    expect(getByText('At least one number and special character')).toBeTruthy();
  });
});