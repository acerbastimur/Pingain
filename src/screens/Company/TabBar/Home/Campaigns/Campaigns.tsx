import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import { Card } from 'react-native-shadow-cards';
import { toJS } from 'mobx';
import FastImage from 'react-native-fast-image';
import CampaignsStyle from './Campaigns.style';
import TabsHeader from '../../../../../common-components/TabsHeader';
import Button from '../../../../../common-components/Button';
import Colors from '../../../../../global/styles/Colors';
import CompanyStore from '../../../../../stores/Company.store';
import CampaignType from '../../../../../schemes/company/CampaignType.enum';

export interface CampaignsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class Campaigns extends React.Component<CampaignsProps> {
  style = CampaignsStyle;

  constructor(props: CampaignsProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { navigation } = this.props;
    const campaigns = toJS(CompanyStore.campaigns);

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
          contentContainerStyle={this.style.scrollViewContainer}
        >
          <View style={this.style.listHeader}>
            <Text style={this.style.listHeaderTextLight}>Müşterilerinin Çok Sevdiği</Text>
            <Text numberOfLines={1} style={this.style.listHeaderTextBold}>
              Kampanyaların
            </Text>
          </View>
          <View style={this.style.campaignCardsContainer}>
            {campaigns
              ? campaigns.map(campaign => {
                  switch (campaign.campaignType) {
                    case CampaignType.Drink:
                      return (
                        <Card
                          elevation={6}
                          opacity={0.15}
                          key={Math.random() * 100}
                          style={this.style.card}
                        >
                          <TouchableOpacity
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={this.style.otherCardBodyItem}
                            onPress={() => {
                              navigation.navigate('CampaignCreate', { edit: true, campaign });
                            }}
                          >
                            <FastImage
                              resizeMode="contain"
                              style={this.style.cardBodyItemIcon}
                              source={require('../../../../../assets/image/User/coffeeIcon.png')}
                            />

                            <Text style={this.style.otherCardBodyItemName}>
                              {campaign.campaignName}
                            </Text>
                            <View style={this.style.arrowContainer}>
                              <FastImage
                                resizeMode="contain"
                                style={this.style.arrow}
                                source={require('../../../../../assets/image/Company/coffeeArrow.png')}
                              />
                            </View>
                          </TouchableOpacity>
                        </Card>
                      );

                    case CampaignType.Meal:
                      return (
                        <Card
                          elevation={6}
                          opacity={0.15}
                          key={Math.random() * 100}
                          style={this.style.card}
                        >
                          <TouchableOpacity
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={this.style.otherCardBodyItem}
                            onPress={() => {
                              navigation.navigate('CampaignCreate', { edit: true, campaign });
                            }}
                          >
                            <FastImage
                              resizeMode="contain"
                              style={this.style.cardBodyItemIcon}
                              source={require('../../../../../assets/image/User/mealIcon.png')}
                            />
                            <Text style={this.style.otherCardBodyItemName}>
                              {campaign.campaignName}
                            </Text>
                            <View style={this.style.arrowContainer}>
                              <FastImage
                                resizeMode="contain"
                                style={this.style.arrow}
                                source={require('../../../../../assets/image/Company/statisticsArrow.png')}
                              />
                            </View>
                          </TouchableOpacity>
                        </Card>
                      );

                    case CampaignType.Dessert:
                      return (
                        <Card
                          elevation={6}
                          opacity={0.15}
                          key={Math.random() * 100}
                          style={this.style.card}
                        >
                          <TouchableOpacity
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={this.style.otherCardBodyItem}
                            onPress={() => {
                              navigation.navigate('CampaignCreate', { edit: true, campaign });
                            }}
                          >
                            <FastImage
                              resizeMode="contain"
                              style={this.style.cardBodyItemIcon}
                              source={require('../../../../../assets/image/User/dessertIcon.png')}
                            />
                            <Text style={this.style.otherCardBodyItemName}>
                              {campaign.campaignName}
                            </Text>
                            <View style={this.style.arrowContainer}>
                              <FastImage
                                resizeMode="contain"
                                style={this.style.arrow}
                                source={require('../../../../../assets/image/Company/dessertArrow.png')}
                              />
                            </View>
                          </TouchableOpacity>
                        </Card>
                      );

                    default:
                      return (
                        <Card
                          elevation={6}
                          opacity={0.15}
                          key={Math.random() * 100}
                          style={this.style.card}
                        >
                          <TouchableOpacity
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={this.style.otherCardBodyItem}
                            onPress={() => {
                              navigation.navigate('CampaignCreate', { edit: true, campaign });
                            }}
                          >
                            <FastImage
                              resizeMode="contain"
                              style={this.style.cardBodyItemIcon}
                              source={require('../../../../../assets/image/User/mealIcon.png')}
                            />

                            <Text style={this.style.otherCardBodyItemName}>
                              {campaign.campaignName}
                            </Text>
                            <View style={this.style.arrowContainer}>
                              <FastImage
                                resizeMode="contain"
                                style={this.style.arrow}
                                source={require('../../../../../assets/image/Company/statisticsArrow.png')}
                              />
                            </View>
                          </TouchableOpacity>
                        </Card>
                      );
                  }
                })
              : null}
          </View>
          <View style={this.style.btnContainer}>
            {campaigns.length < 3 ? (
              <Button
                backgroundColor={Colors.COMPANY}
                text="Yeni Kampanya Oluştur"
                textColor="#fff"
                shadow
                onPress={() => {
                  navigation.navigate('CampaignCreate', { edit: false });
                }}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}
