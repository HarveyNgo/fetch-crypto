import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from '../styles';
import {Icons} from '../../../assets';
import React, {FC, useState} from 'react';
import {CryptoText} from '../../../components';
import {Colors} from '../../../constants/colors';
import CustomInput from '../../../components/CustomInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
import {useAppDispatch} from '../../../redux/hook/useAppDispatch';
import {loginUser} from '../../../redux/slices/authSlice';

interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = ({}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validate={values => {
        const errors = {} as any;
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        return errors;
      }}
      onSubmit={values => {
        setLoading(true);
        dispatch(loginUser({email: values.email, password: values.password}))
          .unwrap()
          .then(() => {
            setLoading(false);
          })
          .catch((error: string) => {
            setLoading(false);
            console.log('Login error:', error);
          });
      }}>
      {({values, errors, handleSubmit, handleChange}) => (
        <>
          <View style={styles.inputForm}>
            <CustomInput
              placeholder="Email"
              placeholderTextColor={Colors.placeholder}
              iconImage={Icons.person}
              onChangeText={handleChange('email')}
              value={values.email}
              errorText={errors.email}
            />
            <CustomInput
              placeholder="Password"
              placeholderTextColor={Colors.placeholder}
              iconImage={Icons.lock}
              containerStyle={styles.emailCustomInput}
              secureTextEntry={secureTextEntry}
              onChangeText={handleChange('password')}
              value={values.password}
              errorText={errors.password}
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
                textComponent={
                  <Text style={styles.checkboxText}>Remember me</Text>
                }
              />
              <CryptoText style={styles.forgotPassword}>
                {'forgot_password'}
              </CryptoText>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signinButton}
              onPress={() => {
                handleSubmit();
              }}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Text style={styles.signinButtonText}>Sign in</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dontHaveAccount}>
              <CryptoText style={styles.dontHaveAccountText}>
                {'dont_have_account'}
              </CryptoText>
              <CryptoText style={styles.signUp}>{'signup'}</CryptoText>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
