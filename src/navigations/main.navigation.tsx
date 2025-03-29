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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icons} from '../assets';
import {Colors} from '../constants/colors';
import {Image, StyleSheet} from 'react-native';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
  const {t} = useTranslation();

  const getTabBarIcon = (
    focused: boolean,
    route: RouteProp<ParamListBase, string>,
  ) => {
    const icons: {[key: string]: any} = {
      HomeScreen: focused ? Icons.home : Icons.home,
      MarketsScreen: focused ? Icons.market : Icons.market,
      WalletsScreen: focused ? Icons.wallet : Icons.wallet,
      PortfolioScreen: focused ? Icons.portfolio : Icons.portfolio,
      MoreScreen: focused ? Icons.more : Icons.more,
    };
    const imageSource = icons[route.name];
    return (
      <Image
        source={imageSource}
        style={[
          styles.image,
          focused ? styles.focusedColor : styles.defaultColor,
        ]}
      />
    );
  };
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.MarketsScreen}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return getTabBarIcon(focused, route);
        },
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
        headerShown: false,
      })}>
      <Tab.Screen
        name={SCREEN_NAME.HomeScreen}
        component={HomeScreen}
        options={{title: t('home')}}
      />
      <Tab.Screen
        name={SCREEN_NAME.MarketsScreen}
        component={MarketsScreen}
        options={{title: t('markets')}}
      />
      <Tab.Screen
        name={SCREEN_NAME.WalletsScreen}
        component={WalletsScreen}
        options={{title: t('wallets')}}
      />
      <Tab.Screen
        name={SCREEN_NAME.PortfolioScreen}
        component={PortfolioScreen}
        options={{title: t('portfolio')}}
      />
      <Tab.Screen
        name={SCREEN_NAME.MoreScreen}
        component={MoreScreen}
        options={{title: t('more')}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
  focusedColor: {
    tintColor: Colors.active,
  },
  defaultColor: {
    tintColor: Colors.inactive,
  },
});
