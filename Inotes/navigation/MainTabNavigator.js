import React from 'react';
import {Platform, View} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  headerTitle: 'Inotes',
  headerRight:  <Ionicons name="md-exit" size={30} color="gray" style={{ paddingRight: 15 }} />,
};

export default createAppContainer(createStackNavigator({
  Home: HomeStack,
}));
