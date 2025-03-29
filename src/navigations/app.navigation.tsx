// import {useAppSelector} from '@commons/hooks';
import React from 'react';
import {AuthNavigation} from './auth.navigation';
import {MainNavigation} from './main.navigation';

export enum SCREEN_NAME {
  LoginScreen = 'LoginScreen',
  HomeScreen = 'HomeScreen',
  MarketsScreen = 'MarketsScreen',
  WalletsScreen = 'WalletsScreen',
  PortfolioScreen = 'PortfolioScreen',
  MoreScreen = 'MoreScreen',
}

export const AppNavigation = () => {
  // const isAuthenticated = useAppSelector(state => state.authReducer.isLogin);
  const isAuthenticated = false;
  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
};
