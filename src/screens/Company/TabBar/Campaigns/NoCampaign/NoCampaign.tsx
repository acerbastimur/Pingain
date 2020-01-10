/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import NoCampaignStyle from './NoCampaign.style';

export interface NoCampaignProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class NoCampaign extends React.Component<NoCampaignProps, any> {
  style = NoCampaignStyle;

  constructor(props: NoCampaignProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;

    return (
      <View>
        <Text>No campaign</Text>
      </View>
    );
  }
}
