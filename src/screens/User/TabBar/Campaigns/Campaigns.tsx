import * as React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import CampaignsStyle from './Campaigns.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyCard from './CompanyCard';

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
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader />
        </View>
        <View style={this.style.bottomAreaContainer}>
          <Text>Hoşgeldin Pingainer</Text>
          <Text>Öne Çıkan Kampanyalar</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={[
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ]}
            renderItem={() => <CompanyCard />}
          />
        </View>
      </View>
    );
  }
}
