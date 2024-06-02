import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../pages/Login';

test('renders login screen correctly', () => {
  const { getByText } = render(<LoginScreen />);
  expect(getByText('Login')).toBeTruthy();
});
