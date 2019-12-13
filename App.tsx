import * as React from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './src/Navigation';

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
