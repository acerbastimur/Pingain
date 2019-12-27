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

  flatListTextHeader = () => {
    return (
      <View style={this.style.flatListHeader}>
        <Text style={this.style.flatListHeaderTextLight}>Hoşgeldin Pingainer</Text>
        <Text numberOfLines={1} style={this.style.flatListHeaderTextBold}>
          Öne Çıkan Kampanyalar
        </Text>
      </View>
    );
  };

  public render() {
    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader />
        </View>
        <View style={this.style.bottomAreaContainer}>
          <FlatList
            ListHeaderComponent={this.flatListTextHeader}
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
