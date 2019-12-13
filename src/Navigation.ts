import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Onboarding from './screens/Onboarding';

const AppNavigator = createSwitchNavigator(
  {
    Onboarding: {
      screen: Onboarding,
    },
  },
  {
    initialRouteName: 'Onboarding',
  },
);

export default createAppContainer(AppNavigator);
