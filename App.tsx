/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  Text,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import customize from 'react-native-default-props';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import Navigation from './src/navigations/Navigation';
import { setI18nConfig,translate} from './src/translations/Translation';
import * as RNLocalize from 'react-native-localize';


customize(TouchableOpacity, {
  activeOpacity: 0.65,
});

// @ts-ignore-next
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore-next
Text.defaultProps.allowFontScaling = false;

// @ts-ignore-next
TextInput.defaultProps = Text.defaultProps || {};
// @ts-ignore-next
TextInput.defaultProps.allowFontScaling = false;
// @ts-ignore-next
TextInput.defaultProps.underlineColorAndroid = 'transparent';

class App extends React.Component {
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  }
  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);

    if (__DEV__) return SplashScreen.hide();
    (async () => {
      await crashlytics().setCrashlyticsCollectionEnabled(true);
      await messaging().requestPermission();
      const x = await messaging().getToken();
      console.log(x);

      await messaging().registerForRemoteNotifications();
      await messaging().setBackgroundMessageHandler(async () => {
        return null;
      });
    })();

    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
    })
      .then(() => {
        SplashScreen.hide();
      })
      .catch(() => {
        SplashScreen.hide();
      });
    return null;
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  public render() {
    return (
      <SafeAreaView style={[styles.safeAreaFlexWrapper, { backgroundColor: '#f0f3f5' }]}>
        <SafeAreaView style={styles.safeAreaFlex}>
          <Navigation />
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaFlexWrapper: {
    flex: 1,
  },
  safeAreaFlex: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE,
};
export default CodePush(codePushOptions)(App);
