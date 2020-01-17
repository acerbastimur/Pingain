/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import {Card} from 'react-native-shadow-cards';
import StatisticsStyle from './Statistics.style';
import TabsHeader from '../../../../../common-components/TabsHeader';

export interface StatisticsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class Statistics extends React.Component<StatisticsProps, any> {
  style = StatisticsStyle;

  constructor(props: StatisticsProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;

    return (
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
          contentContainerStyle={this.style.scrollViewContainer}>
          <View style={this.style.listHeader}>
            <Text style={this.style.listHeaderTextLight}>İşletmeni İleriye Taşıyacak</Text>
            <Text numberOfLines={1} style={this.style.listHeaderTextBold}>
              İstatistikler
            </Text>
          </View>
          <View style={this.style.statisticsCardsContainer}>
            <Card elevation={6} opacity={0.15} style={this.style.card}>
              <View style={this.style.otherCardBodyItem}>
                <Text style={this.style.otherCardBodyItemName}>Aylık Dağıtılan Pin Sayısı</Text>
                <View style={this.style.cardBodyItemCount}>
                  <Text style={this.style.cardBodyItemCountText}>5</Text>
                </View>
              </View>
            </Card>
            <Card elevation={6} opacity={0.15} style={this.style.card}>
              <View style={this.style.otherCardBodyItem}>
                <Text style={this.style.otherCardBodyItemName}>Aylık Dağıtılan Ödül Sayısı</Text>
                <View style={this.style.cardBodyItemCount}>
                  <Text style={this.style.cardBodyItemCountText}>5</Text>
                </View>
              </View>
            </Card>
            <Card elevation={6} opacity={0.15} style={this.style.card}>
              <View style={this.style.otherCardBodyItem}>
                <Text style={this.style.otherCardBodyItemName}>Aylık Profil Ziyareti</Text>
                <View style={this.style.cardBodyItemCount}>
                  <Text style={this.style.cardBodyItemCountText}>5</Text>
                </View>
              </View>
            </Card>
            <Card elevation={6} opacity={0.15} style={this.style.card}>
              <View style={this.style.otherCardBodyItem}>
                <Text style={this.style.otherCardBodyItemName}>Pingain Üzerinden Kazancım</Text>
                <View style={this.style.cardBodyItemCount}>
                  <Text style={this.style.cardBodyItemCountText}>5</Text>
                </View>
              </View>
            </Card>
            <Card elevation={6} opacity={0.15} style={this.style.card}>
              <View style={this.style.otherCardBodyItem}>
                <Text style={this.style.otherCardBodyItemName}>Aylık Dağıtılan Pin Sayısı</Text>
                <View style={this.style.cardBodyItemCount}>
                  <Text style={this.style.cardBodyItemCountText}>5</Text>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}
