import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity, Text } from 'react-native';
import HomeScreen from '../pages/Home';
import { IStackScreenProps } from '../src/library/StackScreenProps';

// Mocking navigation and user context
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../contexts/user-context', () => ({
  useUser: jest.fn(),
}));

// Mocking axios
jest.mock('axios');

describe('HomeScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  const mockProps: IStackScreenProps = {
    navigation: mockNavigation,
    route: {},
    nameProp: 'TestName',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to Services screen when a service item is pressed', async () => {
    const component = renderer.create(<HomeScreen {...mockProps} />);
    const instance = component.root;

    // Find the TouchableOpacity with text 'Tops'
    const serviceButton = instance.findAllByType(TouchableOpacity).find(node => {
      const textChild = node.findByType(Text);
      return textChild.props.children === 'Tops';
    });

    // Ensure the button is found
    expect(serviceButton).toBeTruthy();

    // Simulate press
    await act(async () => {
      serviceButton?.props.onPress();
    });

    // Expect navigation to have been called with specific parameters
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Services', { speciality: 'Tops' });
  });

  // Add more test cases for different functionalities
});