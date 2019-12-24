import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ShareUsStyle from './ShareUs.style';

export interface ShareUsProps {}

export interface ShareUsState {}

export default class ShareUs extends React.Component<ShareUsProps, ShareUsState> {
  style = ShareUsStyle;

  constructor(props: ShareUsProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View>
        <Text>ShareUs Component</Text>
      </View>
    );
  }
}
