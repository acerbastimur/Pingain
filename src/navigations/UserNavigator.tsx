/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import GetUserInfo from '../screens/User/GetUserInfo';
import UserDetails from '../screens/User/UserDetails';
import UserDetailsEdit from '../screens/User/UserDetailsEdit';
import Campaigns from '../screens/User/TabBar/Campaigns';
import QrRead from '../screens/User/TabBar/QrRead';
import CompanyDetails from '../common-components/CompanyDetails';
import Prizes from '../screens/User/TabBar/Prizes';

const UserDetailsStack = createStackNavigator(
  {
    UserDetails: {
      screen: UserDetails,
    },
    UserDetailsEdit: {
      screen: UserDetailsEdit,
    },
  },
  {
    initialRouteName: 'UserDetails',
    headerMode: 'none',
  },
);
const CampaignsStack = createStackNavigator(
  {
    CampaignsHome: {
      screen: Campaigns,
    },
    CompanyDetails: {
      screen: CompanyDetails,
    },
    UserDetails: {
      screen: UserDetailsStack,
    },
  },
  {initialRouteName: 'CampaignsHome', headerMode: 'none'},
);

const QrReadStack = createStackNavigator(
  {
    QrReadHome: {
      screen: QrRead,
    },
    UserDetails: {
      screen: UserDetailsStack,
    },
  },
  {initialRouteName: 'QrReadHome', headerMode: 'none'},
);

const PrizesStack = createStackNavigator(
  {
    PrizesHome: {
      screen: Prizes,
    },
    UserDetails: {
      screen: UserDetailsStack,
    },
  },
  {initialRouteName: 'PrizesHome', headerMode: 'none'},
);

const UserTabNavigation = createBottomTabNavigator(
  {
    Campaigns: {
      screen: CampaignsStack,
      navigationOptions: {
        tabBarIcon: e => {
          if (e.focused) {
            return (
              <Image
                style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
                source={require('../assets/image/UserTab/CampaignsTabIcon.png')}
              />
            );
          }
          return (
            <Image
              style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
              source={require('../assets/image/UserTab/CampaignsTabIconDisabled.png')}
            />
          );
        },
      },
    },
    QrRead: {
      screen: QrReadStack,
      navigationOptions: {
        tabBarIcon: (
          <Image
            style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}}
            source={require('../assets/image/UserTab/QrCodeTabIcon.png')}
          />
        ),
      },
    },
    Prizes: {
      screen: PrizesStack,
      navigationOptions: {
        tabBarIcon: e => {
          if (e.focused) {
            return (
              <Image
                style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
                source={require('../assets/image/UserTab/PrizesIcon.png')}
              />
            );
          }
          return (
            <Image
              style={{resizeMode: 'contain', width: 30, height: 30, alignSelf: 'center'}}
              source={require('../assets/image/UserTab/PrizesIconDisabled.png')}
            />
          );
        },
      },
    },
  },
  {
    lazy: false,
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

export default UserNavigator;
