import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Onboarding from './screens/Onboarding';
import AuthTypeSelect from './screens/AuthTypeSelect';
import UserLogin from './screens/User/Login';
import UserRegister from './screens/User/Register';
import ResetPassword from './screens/ResetPassword';

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
  },
  {
    headerMode: 'none',
    initialRouteName: 'ResetPassword',
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
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
