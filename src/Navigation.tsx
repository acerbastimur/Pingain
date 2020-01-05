/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Onboarding from './screens/Onboarding';
import AuthTypeSelect from './screens/AuthTypeSelect';
import UserLogin from './screens/User/Login';
import UserRegister from './screens/User/Register';
import ResetPassword from './screens/ResetPassword';
import CompanyRegister from './screens/Company/Register';
import CompanyLogin from './screens/Company/Login';
import GetUserInfo from './screens/User/GetUserInfo';
import GetCompanyInfo from './screens/Company/GetCompanyInfo';
import Campaigns from './screens/User/TabBar/Campaigns';
import QrRead from './screens/User/TabBar/QrRead';
import ShareUs from './screens/User/TabBar/ShareUs/ShareUs';
import CompanyDetails from './screens/User/TabBar/Campaigns/CompanyDetails';

const CampaignsStack = createStackNavigator(
  {
    CampaignsHome: {
      screen: Campaigns,
    },
    CompanyDetails: {
      screen: CompanyDetails,
    },
  },
  {initialRouteName: 'CampaignsHome', headerMode: 'none'},
);

const UserTabNavigation = createBottomTabNavigator(
  {
    Campaigns: {
      screen: CampaignsStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: (
          <Image
            style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
            source={require('./assets/image/UserTab/CampaignsTabIcon.png')}
          />
        ),
      },
    },
    QrRead: {
      screen: QrRead,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: (
          <Image
            style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}}
            source={require('./assets/image/UserTab/QrCodeTabIcon.png')}
          />
        ),
      },
    },
    ShareUs: {
      screen: ShareUs,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: (
          <Image
            style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
            source={require('./assets/image/UserTab/ShareUsTabIcon.png')}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'ShareUs',
    tabBarOptions: {
      showLabel: false,
      style: {
        borderColor: '#000',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: 80,
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20.0,
        borderTopWidth: 0,
        elevation: 16,
      },

      safeAreaInset: {bottom: 'never', top: 'never'}, // <-- this is the solution
    },
  },
);

const UserNavigator = createSwitchNavigator(
  {
    GetUserInfo: {
      screen: GetUserInfo,
    },
    UserTabNavigation: {
      screen: UserTabNavigation,
    },
  },
  {initialRouteName: 'UserTabNavigation'},
);

const CompanyNavigator = createSwitchNavigator(
  {
    GetCompanyInfo: {
      screen: GetCompanyInfo,
    },
  },
  {initialRouteName: 'GetCompanyInfo'},
);

const AuthNavigator = createStackNavigator(
  {
    AuthTypeSelect: {
      screen: AuthTypeSelect,
    },
    UserLogin: {
      screen: UserLogin,
    },
    UserRegister: {
      screen: UserRegister,
    },
    ResetPassword: {
      screen: ResetPassword,
    },
    CompanyRegister: {
      screen: CompanyRegister,
    },
    CompanyLogin: {
      screen: CompanyLogin,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'AuthTypeSelect',
  },
);

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
    initialRouteName: 'UserNavigator',
  },
);

export default createAppContainer(AppNavigator);
