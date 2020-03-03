/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FastImage from 'react-native-fast-image';
import GetUserInfo from '../screens/User/GetUserInfo';
import UserDetails from '../screens/User/UserDetails';
import UserDetailsEdit from '../screens/User/UserDetailsEdit';
import Campaigns from '../screens/User/TabBar/Campaigns';
import QrRead from '../screens/User/TabBar/QrRead';
import CompanyDetails from '../screens/User/CompanyDetails';
import Prizes from '../screens/User/TabBar/Prizes';
import Colors from '../styles/Colors';

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
    cardStyle: { backgroundColor: Colors.Background },
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
  {
    initialRouteName: 'CampaignsHome',
    headerMode: 'none',
    cardStyle: { backgroundColor: Colors.Background },
  },
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
  {
    initialRouteName: 'QrReadHome',
    headerMode: 'none',
    cardStyle: { backgroundColor: Colors.Background },
  },
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
  {
    initialRouteName: 'PrizesHome',
    headerMode: 'none',
    cardStyle: { backgroundColor: Colors.Background },
  },
);

const UserTabNavigation = createBottomTabNavigator(
  {
    Campaigns: {
      screen: CampaignsStack,
      navigationOptions: {
        tabBarIcon: e => {
          if (e.focused) {
            return (
              <FastImage
                resizeMode="contain"
                style={{ width: 30, height: 30, alignSelf: 'center' }}
                source={require('../assets/image/UserTab/CampaignsTabIcon.png')}
              />
            );
          }
          return (
            <FastImage
              resizeMode="contain"
              style={{ width: 30, height: 30, alignSelf: 'center' }}
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
          <FastImage
            resizeMode="contain"
            style={{ width: 50, height: 50, alignSelf: 'center' }}
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
              <FastImage
                resizeMode="contain"
                style={{ width: 30, height: 30, alignSelf: 'center' }}
                source={require('../assets/image/UserTab/PrizesIcon.png')}
              />
            );
          }
          return (
            <FastImage
              resizeMode="contain"
              style={{ width: 30, height: 30, alignSelf: 'center' }}
              source={require('../assets/image/UserTab/PrizesIconDisabled.png')}
            />
          );
        },
      },
    },
  },
  {
    lazy: true,
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

      safeAreaInset: { bottom: 'never', top: 'never' }, // <-- this is the solution
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
  { initialRouteName: 'UserTabNavigation' },
);

export default UserNavigator;
