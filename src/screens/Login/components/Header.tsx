import {Image, View} from 'react-native';
import {styles} from '../styles';
import {Images} from '../../../assets';
import React from 'react';
import {CryptoText} from '../../../components';

const Header = () => {
  return (
    <View style={styles.loginFormContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Images.logo} />
        <CryptoText style={styles.signin}>{'signin'}</CryptoText>
        <CryptoText style={styles.pleaseSignin}>{'please_signin'}</CryptoText>
      </View>
    </View>
  );
};

export default Header;
