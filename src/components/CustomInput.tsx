import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../constants/colors';

interface CustomInputProp extends TextInputProps {
  containerStyle?: StyleProp<TextStyle>;
  iconImage: any;
  rightComponent?: React.JSX.Element;
  secureTextEntry?: boolean;
}
const CustomInput: React.FC<CustomInputProp> = ({
  containerStyle,
  style,
  iconImage,
  rightComponent,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={iconImage} style={styles.icon} />
      <TextInput
        style={[styles.input, style]}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {rightComponent && rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 47,
    backgroundColor: '#FFFFFF1A',
    borderColor: '#FFFFFF33',
    borderRadius: 6,
    borderWidth: 1.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 17,
    marginLeft: 14.25,
    marginRight: 9.72,
  },
  input: {
    flex: 1,
    color: Colors.primary,
  },
});
export default CustomInput;
