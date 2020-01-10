import {createStackNavigator} from 'react-navigation-stack';
import AuthTypeSelect from '../screens/AuthTypeSelect';
import UserLogin from '../screens/User/Login';
import UserRegister from '../screens/User/Login/UserLogin';
import ResetPassword from '../screens/ResetPassword';
import CompanyRegister from '../screens/Company/Register';
import CompanyLogin from '../screens/Company/Login';

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
export default AuthNavigator;
