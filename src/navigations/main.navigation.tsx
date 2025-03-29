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

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.MarketsScreen}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
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
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.darkGray,
        headerShown: false,
      })}>
      <Tab.Screen name={SCREEN_NAME.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAME.MarketsScreen} component={MarketsScreen} />
      <Tab.Screen name={SCREEN_NAME.WalletsScreen} component={WalletsScreen} />
      <Tab.Screen
        name={SCREEN_NAME.PortfolioScreen}
        component={PortfolioScreen}
      />
      <Tab.Screen name={SCREEN_NAME.MoreScreen} component={MoreScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
  focusedColor: {
    tintColor: Colors.blue,
  },
  defaultColor: {
    tintColor: Colors.darkGray,
  },
});
