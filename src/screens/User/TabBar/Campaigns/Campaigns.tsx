import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CampaignsStyle from './Campaigns.style';
export interface CampaignsProps {}

export interface CampaignsState {}

export default class Campaigns extends React.Component<CampaignsProps, CampaignsState> {
  style = CampaignsStyle;

  constructor(props: CampaignsProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View>
        <Text>Campaigns Component</Text>
      </View>
    );
  }
}
