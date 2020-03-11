import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { Card } from 'react-native-shadow-cards';
import messaging from '@react-native-firebase/messaging';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import FastImage from 'react-native-fast-image';
import HomeStyle from './Home.style';
import NoCampaign from '../../NoCampaign';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyStore from '../../../../stores/Company.store';

export interface HomeProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class Home extends React.Component<HomeProps> {
  style = HomeStyle;

  constructor(props: HomeProps) {
    super(props);
    this.state = {};
    if (!messaging().hasPermission()) messaging().requestPermission();
  }

  public render() {
    const { navigation } = this.props;
    const campaigns = toJS(CompanyStore.campaigns);
    const { companyName } = CompanyStore.companyDetails;

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
              return null;
            }}
          />
        </View>
        {campaigns && campaigns.length > 0 ? (
          <ScrollView style={this.style.scrollViewStyle}>
            <Text style={this.style.headerText}>{companyName}</Text>
            <View style={this.style.campaignsContainer}>
              {campaigns.map(campaign => {
                switch (campaign.campaignType) {
                  case 1:
                    return (
                      <Card
                        key={Math.random() * 100}
                        elevation={6}
                        opacity={0.15}
                        style={this.style.card}
                      >
                        <View style={this.style.otherCardBodyItem}>
                          <FastImage
                            resizeMode="contain"
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/coffeeIcon.png')}
                          />
                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[this.style.cardBodyItemCountText, this.style.cardItemCoffee]}
                            >
                              {campaign?.statistics?.totalPinGiven || 0}
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
                        style={this.style.card}
                      >
                        <View style={this.style.otherCardBodyItem}>
                          <FastImage
                            resizeMode="contain"
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/mealIcon.png')}
                          />

                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[this.style.cardBodyItemCountText, this.style.cardItemMeal]}
                            >
                              {campaign?.statistics?.totalPinGiven || 0}
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
                        style={this.style.card}
                      >
                        <View style={this.style.otherCardBodyItem}>
                          <FastImage
                            resizeMode="contain"
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/dessertIcon.png')}
                          />

                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[this.style.cardBodyItemCountText, this.style.cardItemDessert]}
                            >
                              {campaign?.statistics?.totalPinGiven || 0}
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
                        style={this.style.card}
                      >
                        <View style={this.style.otherCardBodyItem}>
                          <FastImage
                            resizeMode="contain"
                            style={this.style.cardBodyItemIcon}
                            source={require('../../../../assets/image/User/mealIcon.png')}
                          />

                          <Text style={this.style.otherCardBodyItemName}>
                            {campaign.campaignName}
                          </Text>
                          <View style={this.style.cardBodyItemCount}>
                            <Text
                              style={[this.style.cardBodyItemCountText, this.style.cardItemMeal]}
                            >
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
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => {
                    navigation.navigate('CompanyCampaigns');
                  }}
                  style={this.style.otherCardBodyItem}
                >
                  <FastImage
                    resizeMode="contain"
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/createCampaignIcon.png')}
                  />

                  <Text style={this.style.otherCardBodyItemName}>Kampanya Oluştur / Düzenle</Text>
                  <View style={this.style.arrowContainer}>
                    <FastImage
                      resizeMode="contain"
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/createCampaignNavigationIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
              <Card elevation={6} opacity={0.15} style={this.style.card}>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => {
                    navigation.navigate('LastTransaction');
                  }}
                  style={this.style.otherCardBodyItem}
                >
                  <FastImage
                    resizeMode="contain"
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/lastActions.png')}
                  />

                  <Text style={this.style.otherCardBodyItemName}>Son İşlem Yapanlar</Text>
                  <View style={this.style.arrowContainer}>
                    <FastImage
                      resizeMode="contain"
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/lastActionNavigationIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
              <Card elevation={6} opacity={0.15} style={this.style.card}>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  style={this.style.otherCardBodyItem}
                  onPress={() => {
                    navigation.navigate('Statistics');
                  }}
                >
                  <FastImage
                    resizeMode="contain"
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/statisticsIcon.png')}
                  />

                  <Text style={this.style.otherCardBodyItemName}>İstatistikler</Text>
                  <View style={this.style.arrowContainer}>
                    <FastImage
                      resizeMode="contain"
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/statisticsArrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
              {/*   <Card elevation={6} opacity={0.15} style={this.style.card}>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  style={this.style.otherCardBodyItem}
                >
                  <FastImage
                    resizeMode="contain"
                    style={this.style.cardBodyActionIcon}
                    source={require('../../../../assets/image/Company/walletIcon.png')}
                  />

                  <Text style={this.style.otherCardBodyItemName}>Ödeme Ekranı</Text>
                  <View style={this.style.arrowContainer}>
                    <FastImage
                      resizeMode="contain"
                      style={this.style.arrow}
                      source={require('../../../../assets/image/Company/payNavigationIcon.png')}
                    />
                  </View>
                 </TouchableOpacity>
              </Card>
            */}
            </View>
          </ScrollView>
        ) : (
          <NoCampaign navigation={navigation} />
        )}
      </View>
    );
  }
}
