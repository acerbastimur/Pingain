/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import CampaignsStyle from './Campaigns.style';
import NoCampaign from './NoCampaign';

export interface CampaignsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface CampaignsState {
  noCampaign: boolean;
}

@observer
export default class Campaigns extends React.Component<CampaignsProps, CampaignsState> {
  style = CampaignsStyle;

  constructor(props: CampaignsProps) {
    super(props);
    this.state = {
      noCampaign: true,
    };
  }

  public render() {
    const {navigation} = this.props;
    const {noCampaign} = this.state;

    return (
      <View style={this.style.container}>
        {noCampaign ? <NoCampaign navigation={navigation} /> : <Text>there is a campaign</Text>}
      </View>
    );
  }
}
