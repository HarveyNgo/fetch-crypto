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
import {useTranslation} from 'react-i18next';
import {setError} from '../../../redux/slices/commonSlide';

interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = ({}) => {
  const {t} = useTranslation();
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
          errors.email = t('required');
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = t('invalid_email');
        }
        if (!values.password) {
          errors.password = t('required');
        }
        return errors;
      }}
      onSubmit={values => {
        setLoading(true);
        dispatch(loginUser({email: values.email, password: values.password}))
          .unwrap()
          .then(action => {
            setLoading(false);
            if (loginUser.rejected.match(action)) {
              dispatch(setError(action.payload));
            }
          })
          .catch((error: string) => {
            setLoading(false);
            dispatch(setError(error));
          });
      }}>
      {({values, errors, handleSubmit, handleChange}) => (
        <>
          <View style={styles.inputForm}>
            <CustomInput
              placeholder={t('email')}
              placeholderTextColor={Colors.placeholder}
              iconImage={Icons.person}
              onChangeText={handleChange('email')}
              value={values.email}
              errorText={errors.email}
            />
            <CustomInput
              placeholder={t('password')}
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
                iconStyle={styles.checkboxIconStyle}
                innerIconStyle={styles.checkboxIconStyle}
                onPress={(isChecked: boolean) => {
                  console.log(isChecked);
                }}
                textComponent={
                  <Text style={styles.checkboxText}>{t('remember_me')}</Text>
                }
              />
              <CryptoText style={styles.forgotPassword}>
                {t('forgot_password')}
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
                <Text style={styles.signinButtonText}>{t('signin')}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dontHaveAccount}>
              <CryptoText style={styles.dontHaveAccountText}>
                {t('dont_have_account')}
              </CryptoText>
              <CryptoText style={styles.signUp}>{t('signup')}</CryptoText>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
