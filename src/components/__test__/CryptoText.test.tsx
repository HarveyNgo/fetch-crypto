import React from 'react';
import {render} from '@testing-library/react-native';
import CryptoText from '../CryptoText';

describe('CryptoText Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<CryptoText>Hello Crypto</CryptoText>);
    expect(getByText('Hello Crypto')).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const {getByText} = render(
      <CryptoText style={{color: 'red'}}>Styled Text</CryptoText>,
    );
    expect(getByText('Styled Text').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({color: 'red'})]),
    );
  });

  it('inherits default styles', () => {
    const {getByText} = render(<CryptoText>Default Style</CryptoText>);
    expect(getByText('Default Style').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({fontFamily: 'Roboto-Regular'}),
      ]),
    );
  });
});
