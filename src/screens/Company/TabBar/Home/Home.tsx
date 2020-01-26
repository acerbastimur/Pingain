/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import {Card} from 'react-native-shadow-cards';

import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import HomeStyle from './Home.style';
import NoCampaign from '../../NoCampaign';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyStore from '../../../../stores/Company.store';

export interface HomeProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class Home extends React.Component<HomeProps, any> {
  style = HomeStyle;

  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;
    const campaigns = toJS(CompanyStore.campaigns);
    console.table(campaigns);

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
            }}
          />
        </View>
        {campaigns && campaigns.length > 0 ? (
          <ScrollView style={this.style.scrollViewStyle}>
            <Text style={this.style.headerText}>Anasayfa</Text>
            <View style={this.style.campaignsContainer}>
              {campaigns.map(campaign => {
                switch (campaign.campaignType) {
                  case 1:
                    return (
                      <Card
                        key={Math.random() * 100}
                        elevation={6}
                        opacity={0.15}
                        style={this.style.card}>
                        <View style={this.style.otherCardBodyItem}>
                          <Image
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/coffeeIcon.png')}
                          />
                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[this.style.cardBodyItemCountText, this.style.cardItemCoffee]}>
                              5
                            </Text>
                          </View>
                        </View>
                      </Card>
                    );
                  case 2:
                    return (
                      <Card
                        key={Math.random() * 100}
                        elevation={6}
                        opacity={0.15}
                        style={this.style.card}>
                        <View style={this.style.otherCardBodyItem}>
                          <Image
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/mealIcon.png')}
                          />
                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[this.style.cardBodyItemCountText, this.style.cardItemMeal]}>
                              5
                            </Text>
                          </View>
                        </View>
                      </Card>
                    );
                  case 3:
                    return (
                      <Card
                        key={Math.random() * 100}
                        elevation={6}
                        opacity={0.15}
                        style={this.style.card}>
                        <View style={this.style.otherCardBodyItem}>
                          <Image
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/dessertIcon.png')}
                          />
                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[
                                this.style.cardBodyItemCountText,
                                this.style.cardItemDessert,
                              ]}>
                              5
                            </Text>
                          </View>
                        </View>
                      </Card>
                    );
                  default:
                    return (
                      <Card
                        key={Math.random() * 100}
                        elevation={6}
                        opacity={0.15}
                        style={this.style.card}>
                        <View style={this.style.otherCardBodyItem}>
                          <Image
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/mealIcon.png')}
                          />
                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[this.style.cardBodyItemCountText, this.style.cardItemMeal]}>
                              5
                            </Text>
                          </View>
                        </View>
                      </Card>
                    );
                }
              })}
            </View>
            <View style={this.style.actionsContainer}>
              <Card elevation={6} opacity={0.15} style={this.style.card}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CompanyCampaigns');
                  }}
                  style={this.style.otherCardBodyItem}>
                  <Image
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/createCampaignIcon.png')}
                  />
                  <Text style={this.style.otherCardBodyItemName}>Kampanya Oluştur / Düzenle</Text>
                  <View style={this.style.arrowContainer}>
                    <Image
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/createCampaignNavigationIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
              <Card elevation={6} opacity={0.15} style={this.style.card}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LastTransaction');
                  }}
                  style={this.style.otherCardBodyItem}>
                  <Image
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/lastActions.png')}
                  />
                  <Text style={this.style.otherCardBodyItemName}>Son İşlem Yapanlar</Text>
                  <View style={this.style.arrowContainer}>
                    <Image
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/lastActionNavigationIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
              <Card elevation={6} opacity={0.15} style={this.style.card}>
                <TouchableOpacity
                  style={this.style.otherCardBodyItem}
                  onPress={() => {
                    navigation.navigate('Statistics');
                  }}>
                  <Image
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/statisticsIcon.png')}
                  />
                  <Text style={this.style.otherCardBodyItemName}>İstatistikler</Text>
                  <View style={this.style.arrowContainer}>
                    <Image
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/statisticsArrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
              <Card elevation={6} opacity={0.15} style={this.style.card}>
                <TouchableOpacity style={this.style.otherCardBodyItem}>
                  <Image
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/walletIcon.png')}
                  />
                  <Text style={this.style.otherCardBodyItemName}>Ödeme Ekranı</Text>
                  <View style={this.style.arrowContainer}>
                    <Image
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/payNavigationIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          </ScrollView>
        ) : (
          <NoCampaign navigation={navigation} />
        )}
      </View>
    );
  }
}
