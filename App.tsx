/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import customize from 'react-native-default-props';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import Navigation from './src/navigations/Navigation';

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

class App extends React.Component {
  componentDidMount() {
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
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
    })
      .then(() => {
        SplashScreen.hide();
      })
      .catch(() => {
        SplashScreen.hide();
      });
    return null;
  }

  public render() {
    return (
      <SafeAreaView style={styles.safeAreaFlexWrapper}>
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
    backgroundColor: '#f7fafc',
  },
  safeAreaFlex: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
};
export default CodePush(codePushOptions)(App);
