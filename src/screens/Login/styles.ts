import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors.ts';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  //Background
  loginBackground: {
    position: 'absolute',
    width: width,
    height: height,
  },
  loginBg1: {
    zIndex: 1,
    top: 40,
    resizeMode: 'stretch',
  },
  loginBg2: {
    zIndex: 2,
    resizeMode: 'stretch',
    top: 120,
  },
  loginBg3: {
    zIndex: 3,
    resizeMode: 'contain',
    top: 280,
  },
  loginBg4: {
    zIndex: 1,
    resizeMode: 'contain',
    top: 80,
  },
  loginBg5: {
    zIndex: 0,
    left: -20,
    resizeMode: 'stretch',
  },

  loginFormContainer: {
    zIndex: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
  inputForm: {
    marginVertical: 50,
  },
  input: {
    width: '100%',
    height: 47,
    backgroundColor: Colors.transparentTenPercent,
    borderColor: Colors.transparentTwentyPercent,
    borderRadius: 6,
  },
  textInput: {
    color: Colors.primary,
    fontFamily: 'Roboto-Regular',
  },
  inputIcon: {
    width: 16,
    height: 17,
    marginHorizontal: 5,
  },
  functionalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  rememberMe: {
    marginLeft: 6,
    color: Colors.primary,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 21,
  },
  forgotPassword: {
    color: Colors.primary,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 21,
  },
  signinButton: {
    width: '100%',
    height: 45,
    backgroundColor: Colors.gray,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinButtonText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: Colors.blue,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dontHaveAccount: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  dontHaveAccountText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: Colors.primary,
  },
  signUp: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.primary,
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginLeft: 5,
  },
  errorText: {
    color: Colors.red,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 16,
    marginBottom: 10,
  },

  emailCustomInput: {
    marginTop: 10,
  },

  checkboxText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 21,
    marginLeft: 6,
  },
  checkboxIconStyle: {
    borderRadius: 4,
    borderColor: Colors.transparentTwentyPercent,
    backgroundColor: Colors.transparentTenPercent,
  },
  iconEye: {
    width: 19,
    height: 13,
    marginRight: 15,
  },
});
