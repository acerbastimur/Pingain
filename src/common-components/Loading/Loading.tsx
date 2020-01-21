/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/sort-comp */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import LoadingStyle from './Loading.style';

export interface LoadingProps {
  isLoading: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class Loading extends React.Component<LoadingProps, any> {
  s = LoadingStyle;

  constructor(props: LoadingProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    auth().signOut()
    auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'CompanyNavigator' : 'Auth');
    });
  }

  public render() {
    return (
      <View style={this.s.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
