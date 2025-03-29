import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAME} from './app.navigation';
import {
  HomeScreen,
  MarketsScreen,
  MoreScreen,
  PortfolioScreen,
  WalletsScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}
      initialRouteName={SCREEN_NAME.MarketsScreen}>
      <Stack.Screen
        name={SCREEN_NAME.WalletsScreen}
        component={WalletsScreen}
      />
      <Stack.Screen name={SCREEN_NAME.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={SCREEN_NAME.MarketsScreen}
        component={MarketsScreen}
      />

      <Stack.Screen
        name={SCREEN_NAME.PortfolioScreen}
        component={PortfolioScreen}
      />
      <Stack.Screen name={SCREEN_NAME.MoreScreen} component={MoreScreen} />
    </Stack.Navigator>
  );
};
