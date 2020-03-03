import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import { Card } from 'react-native-shadow-cards';
import StatisticsStyle from './Statistics.style';
import TabsHeader from '../../../../../common-components/TabsHeader';
import GetCompanyInfoService from '../../../../../services/company/General/GetCompanyInfo.service';
import CompanyStore from '../../../../../stores/Company.store';

export interface StatisticsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface StatisticsState {
  loading: boolean;
}

export default class Statistics extends React.Component<StatisticsProps, StatisticsState> {
  style = StatisticsStyle;

  constructor(props: StatisticsProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    GetCompanyInfoService.getCompanyInfo().then(() => {
      this.setState({ loading: false });
    });
  }

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
            }}
            onLeftPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
        <ScrollView
          style={this.style.scrollView}
          contentContainerStyle={this.style.scrollViewContainer}
        >
          <View style={this.style.listHeader}>
            <Text style={this.style.listHeaderTextLight}>İşletmeni İleriye Taşıyacak</Text>
            <Text numberOfLines={1} style={this.style.listHeaderTextBold}>
              İstatistikler
            </Text>
          </View>
          <View style={this.style.statisticsCardsContainer}>
            <Card elevation={6} opacity={0.15} style={this.style.card}>
              <View style={this.style.otherCardBodyItem}>
                <Text style={this.style.otherCardBodyItemName}>Toplam Dağıtılan Pin Sayısı</Text>
                <View style={this.style.cardBodyItemCount}>
                  <Text style={this.style.cardBodyItemCountText}>
                    {CompanyStore.companyDetails.statistics.totalPinGiven}
                  </Text>
                </View>
              </View>
            </Card>
            <Card elevation={6} opacity={0.15} style={this.style.card}>
              <View style={this.style.otherCardBodyItem}>
                <Text style={this.style.otherCardBodyItemName}>Toplam Dağıtılan Ödül Sayısı</Text>
                <View style={this.style.cardBodyItemCount}>
                  <Text style={this.style.cardBodyItemCountText}>
                    {CompanyStore.companyDetails.statistics.totalPrizeGiven}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}
