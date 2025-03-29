import {LoginScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAME} from './app.navigation';

const Stack = createNativeStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}
      initialRouteName={SCREEN_NAME.LoginScreen}>
      <Stack.Screen name={SCREEN_NAME.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};
