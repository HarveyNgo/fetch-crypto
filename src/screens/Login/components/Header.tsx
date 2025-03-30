import {Image, StyleSheet, View} from 'react-native';
import {Images} from '../../../assets';
import React from 'react';
import {CryptoText} from '../../../components';
import {Colors} from '../../../constants/colors';
import {useTranslation} from 'react-i18next';

const Header = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={Images.logo} />
      <CryptoText style={styles.signin}>{t('signin')}</CryptoText>
      <CryptoText style={styles.pleaseSignin}>{t('please_signin')}</CryptoText>
    </View>
  );
};

export default Header;

export const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 55,
    height: 55,
  },
  signin: {
    marginTop: 24,
    fontWeight: 900,
    fontSize: 23,
    lineHeight: 30,
    letterSpacing: 0.5,
    color: Colors.primary,
  },
  pleaseSignin: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.secondary,
    marginTop: 9,
  },
});
