import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Onboarding from './screens/Onboarding';
import AuthTypeSelect from './screens/AuthTypeSelect';
import UserLogin from './screens/User/Login';
import UserRegister from './screens/User/Register';
import ResetPassword from './screens/ResetPassword';
import CompanyRegister from './screens/Company/Register';
import CompanyLogin from './screens/Company/Login';
import GetUserInfo from './screens/User/GetUserInfo';
import GetCompanyInfo from './screens/Company/GetCompanyInfo';

const UserStack = createStackNavigator(
  {
    GetUserInfo: {
      screen: GetUserInfo,
    },
  },
  {headerMode: 'none', initialRouteName: 'GetUserInfo'},
);

const CompanyStack = createStackNavigator(
  {
    GetCompanyInfo: {
      screen: GetCompanyInfo,
    },
  },
  {headerMode: 'none', initialRouteName: 'GetCompanyInfo'},
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
    UserStack: {
      screen: UserStack,
    },
    CompanyStack: {
      screen: CompanyStack,
    },
  },
  {
    initialRouteName: 'CompanyStack',
  },
);

export default createAppContainer(AppNavigator);
