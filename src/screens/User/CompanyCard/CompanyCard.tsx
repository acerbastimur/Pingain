/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-shadow-cards';

import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import CompanyCardStyle from './CompanyCard.style';
import CampaignDetailsStore from '../../../stores/CampaignDetailsModal.store';
import {UserCompany, Campaign} from '../../../schemes/user/UserCompany';
import CampaignType from '../../../schemes/company/CampaignType.enum';

export interface CompanyCardProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  shouldHeaderHide?: boolean;
  company: UserCompany;
}

export default class CompanyCard extends React.Component<CompanyCardProps, any> {
  s = CompanyCardStyle;

  constructor(props: CompanyCardProps) {
    super(props);
    this.state = {};
  }

  campaignIcon = ({campaignType}: Campaign) => {
    switch (campaignType) {
      case CampaignType.Drink:
        return (
          <Image
            style={this.s.cardBodyItemIcon}
            source={require('../../../assets/image/User/coffeeIcon.png')}
          />
        );
      case CampaignType.Meal:
        return (
          <Image
            style={this.s.cardBodyItemIcon}
            source={require('../../../assets/image/User/mealIcon.png')}
          />
        );
      case CampaignType.Dessert:
        return (
          <Image
            style={this.s.cardBodyItemIcon}
            source={require('../../../assets/image/User/dessertIcon.png')}
          />
        );
      default:
        return (
          <Image
            style={this.s.cardBodyItemIcon}
            source={require('../../../assets/image/User/coffeeIcon.png')}
          />
        );
    }
  };

  // eslint-disable-next-line consistent-return
  campaignCount = ({campaignType, actionCount}: Campaign, isCompleted: boolean) => {
    switch (campaignType) {
      case CampaignType.Drink:
        if (isCompleted) {
          return (
            <View style={[this.s.cardBodyItemCount, this.s.coffeeDoneBackground]}>
              <Image style={this.s.tick} source={require('../../../assets/image/tickWhite.png')} />
            </View>
          );
        }
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>1</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>/</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>{actionCount}</Text>
          </View>
        );
      case CampaignType.Meal:
        if (isCompleted) {
          return (
            <View style={[this.s.cardBodyItemCount, this.s.mealDoneBackground]}>
              <Image style={this.s.tick} source={require('../../../assets/image/tickWhite.png')} />
            </View>
          );
        }
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>1</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>/</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>{actionCount}</Text>
          </View>
        );
      case CampaignType.Dessert:
        if (isCompleted) {
          return (
            <View style={[this.s.cardBodyItemCount, this.s.dessertDoneBackground]}>
              <Image style={this.s.tick} source={require('../../../assets/image/tickWhite.png')} />
            </View>
          );
        }
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>1</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>/</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>
              {actionCount}
            </Text>
          </View>
        );
      default:
        break;
    }
  };

  public render() {
    const {navigation, shouldHeaderHide, company} = this.props;
    return (
      <Card elevation={6} opacity={0.15} style={this.s.card}>
        {!shouldHeaderHide && (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CompanyDetails', {company});
              }}
              style={this.s.cardHeader}>
              <View style={this.s.cardHeaderImageContainer}>
                <Image source={{uri: company.companyLogo}} style={this.s.cardHeaderImage} />
              </View>

              <Text style={this.s.cardHeaderText}>{company.companyName}</Text>
              <Image
                style={this.s.headerArrow}
                source={require('../../../assets/image/User/arrow.png')}
              />
            </TouchableOpacity>
            <View style={this.s.line} />
          </View>
        )}
        <View style={this.s.cardBody}>
          {company.campaigns.map(campaign => {
            return (
              <TouchableOpacity
                key={Math.random() * 1000}
                style={this.s.cardBodyItem}
                onPress={() => {
                  CampaignDetailsStore.campaignDetailsHalfModalRef.open();
                }}>
                {this.campaignIcon(campaign)}
                <Text style={this.s.cardBodyItemName}>{campaign.campaignName}</Text>
                {this.campaignCount(campaign, false)}
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>
    );
  }
}
