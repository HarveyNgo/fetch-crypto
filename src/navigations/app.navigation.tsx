import React from 'react';
import {AuthNavigation} from './auth.navigation';
import {MainNavigation} from './main.navigation';
import {useAppSelector} from '../redux/hook/useAppSelector';

export enum SCREEN_NAME {
  LoginScreen = 'LoginScreen',
  HomeScreen = 'HomeScreen',
  MarketsScreen = 'MarketsScreen',
  WalletsScreen = 'WalletsScreen',
  PortfolioScreen = 'PortfolioScreen',
  MoreScreen = 'MoreScreen',
}

export const AppNavigation = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
};
