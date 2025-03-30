import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomInput from '../CustomInput'; // Adjust the path if needed
import {Image} from 'react-native';
// import {Colors} from '../src/constants/colors';
import {Icons} from '../../assets/index';

// Mock CryptoText to prevent additional dependencies in tests
// jest.mock('../src/components/CryptoText', () => props => <Text {...props} />);

describe('CustomInput Component', () => {
  const mockIcon = Icons.home;

  it('renders correctly', () => {
    const {getByPlaceholderText} = render(
      <CustomInput placeholder="Enter text" iconImage={mockIcon} />,
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('displays error text when provided', () => {
    const {getByText} = render(
      <CustomInput
        placeholder="Enter text"
        iconImage={mockIcon}
        errorText="Invalid input"
      />,
    );
    expect(getByText('Invalid input')).toBeTruthy();
  });

  it('calls onChangeText when input changes', () => {
    const mockOnChangeText = jest.fn();
    const {getByPlaceholderText} = render(
      <CustomInput
        placeholder="Enter text"
        iconImage={mockIcon}
        onChangeText={mockOnChangeText}
      />,
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('hides text when secureTextEntry is true', () => {
    const {getByPlaceholderText} = render(
      <CustomInput
        placeholder="Password"
        iconImage={mockIcon}
        secureTextEntry
      />,
    );

    expect(getByPlaceholderText('Password').props.secureTextEntry).toBe(true);
  });

  it('renders the right component if provided', () => {
    const RightComponent = <Image source={mockIcon} testID="right-icon" />;
    const {getByTestId} = render(
      <CustomInput
        placeholder="With right component"
        iconImage={mockIcon}
        rightComponent={RightComponent}
      />,
    );

    expect(getByTestId('right-icon')).toBeTruthy();
  });
});
