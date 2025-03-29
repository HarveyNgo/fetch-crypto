import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from '../styles';
import {Icons, Images} from '../../../assets';
import React, {useState} from 'react';
import {CryptoText} from '../../../components';
import {Colors} from '../../../constants/colors';
import CustomInput from '../../../components/CustomInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const LoginForm = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.loginFormContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Images.logo} />
        <CryptoText style={styles.signin}>{'signin'}</CryptoText>
        <CryptoText style={styles.pleaseSignin}>{'please_signin'}</CryptoText>
      </View>
      <View style={styles.inputForm}>
        <CustomInput
          placeholder="Email"
          placeholderTextColor={Colors.placeholder}
          iconImage={Icons.person}
        />
        <CustomInput
          placeholder="Password"
          placeholderTextColor={Colors.placeholder}
          iconImage={Icons.lock}
          containerStyle={styles.emailCustomInput}
          secureTextEntry={secureTextEntry}
          rightComponent={
            <TouchableWithoutFeedback onPress={toggleSecureTextEntry}>
              <Image source={Icons.eyeOpen} style={styles.iconEye} />
            </TouchableWithoutFeedback>
          }
        />
        <View style={styles.functionalContainer}>
          <BouncyCheckbox
            size={19}
            fillColor="#FFFFFF33"
            unFillColor="transparent"
            text="Custom Checkbox"
            iconStyle={styles.checkboxIconStyle}
            innerIconStyle={styles.checkboxIconStyle}
            onPress={(isChecked: boolean) => {
              console.log(isChecked);
            }}
            textComponent={<Text style={styles.checkboxText}>Remember me</Text>}
          />
          <CryptoText style={styles.forgotPassword}>
            {'forgot_password'}
          </CryptoText>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.dontHaveAccount}>
          <CryptoText style={styles.dontHaveAccountText}>
            {'dont_have_account'}
          </CryptoText>
          <CryptoText style={styles.signUp}>{'signup'}</CryptoText>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
