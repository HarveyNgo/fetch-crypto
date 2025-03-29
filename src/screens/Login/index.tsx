import React, {View} from 'react-native';
import BackgroundImage from './components/BackgroundImage';
import {styles} from './styles';
import LoginForm from './components/LoginForm';
import Header from './components/Header';

const LoginScreen = ({}) => {
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={styles.loginFormContainer}>
        <Header />
        <LoginForm />
      </View>
    </View>
  );
};

export default LoginScreen;
