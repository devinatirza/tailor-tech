import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import UpdateProfileScreen from '../pages/UpdateProfile';
import { useUser } from '../contexts/user-context';

jest.mock('axios');
jest.mock('../contexts/user-context');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('UpdateProfileScreen', () => {
  const mockUser = {
    ID: 1,
    Name: 'John Doe',
    Email: 'john.doe@example.com',
    PhoneNumber: '1234567890',
    Address: '123 Main St',
    Points: 100,
  };

  const mockUserContext = {
    user: mockUser,
    updateUser: jest.fn(),
  };

  beforeEach(() => {
    useUser.mockReturnValue(mockUserContext);
    jest.clearAllMocks();
  });

  it('renders the profile screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(<UpdateProfileScreen />);

    expect(getByPlaceholderText('Name').props.value).toBe(mockUser.Name);
    expect(getByPlaceholderText('Email').props.value).toBe(mockUser.Email);
    expect(getByPlaceholderText('Phone Number').props.value).toBe(mockUser.PhoneNumber);
    expect(getByPlaceholderText('Address').props.value).toBe(mockUser.Address);
    expect(getByText('Edit Profile')).toBeTruthy();
  });

  it('toggles editing state for name', () => {
    const { getByPlaceholderText, getByText } = render(<UpdateProfileScreen />);

    fireEvent.press(getByText(/pencilIcon/));

    expect(getByPlaceholderText('Name').props.editable).toBe(true);
  });

  it('validates and updates password correctly', async () => {
    axios.post.mockResolvedValue({ status: 200, data: { user: mockUser } });

    const { getByPlaceholderText, getByText } = render(<UpdateProfileScreen />);

    fireEvent.press(getByText(/pencilIcon/));
    fireEvent.changeText(getByPlaceholderText('Password'), 'NewPassword123!');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'NewPassword123!');
    fireEvent.press(getByText('SAVE'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8000/update-profile',
        expect.objectContaining({
          userId: mockUser.ID,
          password: 'NewPassword123!',
          confirm: 'NewPassword123!',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });

  it('shows error if passwords do not match', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<UpdateProfileScreen />);

    fireEvent.press(getByText(/pencilIcon/));
    fireEvent.changeText(getByPlaceholderText('Password'), 'NewPassword123!');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'Mismatch123!');
    fireEvent.press(getByText('SAVE'));

    await waitFor(() => {
      expect(getByTestId('error')).toHaveTextContent('Passwords do not match');
    });
  });

  it('handles API errors gracefully', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    const { getByText } = render(<UpdateProfileScreen />);

    fireEvent.press(getByText('SAVE'));

    await waitFor(() => {
      expect(getByText('An error occurred. Please try again later.')).toBeTruthy();
    });
  });

  it('updates user context after successful update', async () => {
    const updatedUser = { ...mockUser, Name: 'Jane Doe' };
    axios.post.mockResolvedValue({ status: 200, data: { user: updatedUser } });

    const { getByPlaceholderText, getByText } = render(<UpdateProfileScreen />);

    fireEvent.changeText(getByPlaceholderText('Name'), 'Jane Doe');
    fireEvent.press(getByText('SAVE'));

    await waitFor(() => {
      expect(mockUserContext.updateUser).toHaveBeenCalledWith(updatedUser);
      expect(getByText('Profile updated successfully!')).toBeTruthy();
    });
  });
});
