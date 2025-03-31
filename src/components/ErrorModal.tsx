import React from 'react';
import {Button, Modal, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../redux/hook/useAppSelector';
import CryptoText from './CryptoText';
import {Colors} from '../constants/colors';
import {clearError} from '../redux/slices/commonSlide';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const {error, errorMessage} = useAppSelector(state => state.common);

  return (
    <Modal visible={error} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <CryptoText style={styles.title}>{errorMessage}</CryptoText>
          <Button title="OK" onPress={() => dispatch(clearError())} />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  viewContainer: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    marginBottom: 10,
  },
});
