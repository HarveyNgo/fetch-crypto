import React, {View} from 'react-native';
import BackgroundImage from './components/BackgroundImage';
import {styles} from './styles';
import LoginForm from './components/LoginForm';
import Header from './components/Header';

const LoginScreen = () => {
  //Render UI
  return (
    <View style={styles.container}>
      <BackgroundImage />
      {/* <Header /> */}
      <LoginForm />
    </View>
  );
};

export default LoginScreen;
