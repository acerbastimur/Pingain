/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Button, Text, FlatList, Dimensions} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import QrReadStyle from './QrRead.style';

export interface QrReadProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class QrRead extends React.Component<QrReadProps, any> {
  style = QrReadStyle;

  constructor(props: QrReadProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;

    return <Text>Company Read Qr</Text>;
  }
}
