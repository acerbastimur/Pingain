import * as React from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './src/navigations/Navigation';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    const x = new AbortController();
    x.abort();
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
