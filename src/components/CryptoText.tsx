import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const CryptoText: React.FC<TextProps> = ({style, ...props}) => {
  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});
export default CryptoText;
