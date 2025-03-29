import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants/colors.ts';
import CryptoText from '../../../components/CryptoText.tsx';

type Props = {
  name: string;
  isActive: boolean;
  length: number;
};

const {width} = Dimensions.get('window');

const CoinButton: FC<Props> = ({name, isActive, length}) => {
  const containerWidth = width / length - 10;

  return (
    <View
      style={[
        styles.container,
        {width: containerWidth},
        isActive && styles.activeContainer,
      ]}>
      <CryptoText style={[styles.text, isActive && styles.activeText]}>
        {name}
      </CryptoText>
    </View>
  );
};

export default CoinButton;

const styles = StyleSheet.create({
  container: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: Colors.inactiveBackground,
  },
  activeContainer: {
    backgroundColor: Colors.purple,
  },
  text: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 15,
    color: Colors.inactiveText,
  },
  activeText: {
    color: Colors.primary,
  },
});
