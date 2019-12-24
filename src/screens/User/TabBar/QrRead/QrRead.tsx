import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import QrReadStyle from './QrRead.style';

export interface QrReadProps {}

export interface QrReadState {}

export default class QrRead extends React.Component<QrReadProps, QrReadState> {
  style = QrReadStyle;

  constructor(props: QrReadProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View>
        <Text>QrRead Component</Text>
      </View>
    );
  }
}
