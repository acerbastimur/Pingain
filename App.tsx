import * as React from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import customize from 'react-native-default-props';
import Navigation from './src/navigations/Navigation';

customize(TouchableOpacity, {
  activeOpacity: 0.5,
});

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
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
