/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import GetCompanyInfo from '../screens/Company/GetCompanyInfo';
import Campaigns from '../screens/Company/TabBar/Campaigns';
import QrGenerate from '../screens/Company/TabBar/QrGenerate';
import QrRead from '../screens/Company/TabBar/QrRead';
import Statistics from '../screens/Company/TabBar/Campaigns/Statistics';

const CampaignsStack = createStackNavigator(
  {
    CampaignsHome: {
      screen: Campaigns,
    },
    Statistics: {
      screen: Statistics,
    },
  },
  {initialRouteName: 'CampaignsHome', headerMode: 'none'},
);

const QrGenerateStack = createStackNavigator(
  {
    QrGenerateHome: {
      screen: QrGenerate,
    },
  },
  {initialRouteName: 'QrGenerateHome', headerMode: 'none'},
);

const QrReadStack = createStackNavigator(
  {
    QrReadHome: {
      screen: QrRead,
    },
  },
  {initialRouteName: 'QrReadHome', headerMode: 'none'},
);
const CompanyTabNavigation = createBottomTabNavigator(
  {
    Campaigns: {
      screen: CampaignsStack,
      navigationOptions: {
        tabBarIcon: e => {
          if (e.focused) {
            return (
              <Image
                style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
                source={require('../assets/image/CompanyTab/CampaignsTabIcon.png')}
              />
            );
          }
          return (
            <Image
              style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
              source={require('../assets/image/CompanyTab/CampaignsTabIconDisabled.png')}
            />
          );
        },
      },
    },
    QrGenerate: {
      screen: QrGenerateStack,
      navigationOptions: {
        tabBarIcon: (
          <Image
            style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}}
            source={require('../assets/image/CompanyTab/QrCodeTabIcon.png')}
          />
        ),
      },
    },
    QrRead: {
      screen: QrReadStack,
      navigationOptions: {
        tabBarIcon: e => {
          if (e.focused) {
            return (
              <Image
                style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
                source={require('../assets/image/CompanyTab/ReadQrIcon.png')}
              />
            );
          }
          return (
            <Image
              style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
              source={require('../assets/image/CompanyTab/ReadQrIconDisabled.png')}
            />
          );
        },
      },
    },
  },
  {
    initialRouteName: 'Campaigns',
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 80,
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20.0,
        borderTopWidth: 0,
        elevation: 20,

        borderColor: '#aaa',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      },

      safeAreaInset: {bottom: 'never', top: 'never'}, // <-- this is the solution
    },
  },
);

const CompanyNavigator = createSwitchNavigator(
  {
    GetCompanyInfo: {
      screen: GetCompanyInfo,
    },
    CompanyTabNavigation: {
      screen: CompanyTabNavigation,
    },
  },
  {initialRouteName: 'CompanyTabNavigation'},
);

export default CompanyNavigator;