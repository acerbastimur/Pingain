import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import customize from 'react-native-default-props';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import Navigation from './src/navigations/Navigation';

customize(TouchableOpacity, {
  activeOpacity: 0.5,
});
class App extends React.Component {
  componentDidMount() {
    crashlytics().setCrashlyticsCollectionEnabled(true);
    messaging().registerForRemoteNotifications();

    CodePush.sync({
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
    })
      .then(() => {
        SplashScreen.hide();
      })
      .catch(() => {
        SplashScreen.hide();
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }

  public render() {
    return (
      <SafeAreaView style={styles.safeAreaFlex}>
        <Navigation />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaFlex: {
    flex: 1,
  },
});

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
};
export default CodePush(codePushOptions)(App);
