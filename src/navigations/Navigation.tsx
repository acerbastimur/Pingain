/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Onboarding from '../screens/Onboarding';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import CompanyNavigator from './CompanyNavigator';

const AppNavigator = createSwitchNavigator(
  {
    Onboarding: {
      screen: Onboarding,
    },
    Auth: {
      screen: AuthNavigator,
    },
    UserNavigator: {
      screen: UserNavigator,
    },
    CompanyNavigator: {
      screen: CompanyNavigator,
    },
  },
  {
    initialRouteName: 'CompanyNavigator',
  },
);

export default createAppContainer(AppNavigator);
