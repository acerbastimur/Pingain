import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Onboarding from '../screens/Onboarding';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import CompanyNavigator from './CompanyNavigator';
import Loading from '../common-components/Loading';

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
    Loading: {
      screen: Loading,
    },
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppNavigator);
