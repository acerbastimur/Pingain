/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Button, Text, FlatList, Dimensions} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import QrGenerateStyle from './QrGenerate.style';

export interface QrGenerateProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class QrGenerate extends React.Component<QrGenerateProps, any> {
  style = QrGenerateStyle;

  constructor(props: QrGenerateProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;

    return <Text>Company Generate Qr</Text>;
  }
}
