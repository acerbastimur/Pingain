import * as React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import customize from 'react-native-default-props';
import Navigation from './src/navigations/Navigation';
import CodePush, { CodePushOptions } from "react-native-code-push";
import SplashScreen from 'react-native-splash-screen';

customize(TouchableOpacity, {
  activeOpacity: 0.5,
});
class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    CodePush.sync({
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
    }).then(() => {
      SplashScreen.hide();
    }).catch(() => {
      SplashScreen.hide();

    })
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

let codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
}
export default CodePush(codePushOptions)(App)
