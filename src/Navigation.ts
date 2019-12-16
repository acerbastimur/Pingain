import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Onboarding from './screens/Onboarding';
import UserTypeSelect from './screens/UserTypeSelect';

const AppNavigator = createSwitchNavigator(
  {
    Onboarding: {
      screen: Onboarding,
    },
    UserAuth: {
      screen: UserTypeSelect,
    },
  },
  {
    initialRouteName: 'Onboarding',
  },
);

export default createAppContainer(AppNavigator);
