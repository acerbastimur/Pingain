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
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import FastImage from 'react-native-fast-image';

import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import CompanyCardStyle from './CompanyCard.style';
import CampaignDetailsStore from '../../../stores/CampaignDetailsModal.store';
import {UserCompany, Campaign} from '../../../schemes/user/UserCompany';
import CampaignType from '../../../schemes/company/CampaignType.enum';
import {ActiveCampaign} from '../../../schemes/user/User';
import UserStore from '../../../stores/User.store';

export interface CompanyCardProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  shouldHeaderHide?: boolean;
  company: UserCompany;
}

export interface CompanyCardState {
  companyImageLoading: boolean;
}

@observer
export default class CompanyCard extends React.Component<CompanyCardProps, CompanyCardState> {
  s = CompanyCardStyle;

  constructor(props: CompanyCardProps) {
    super(props);
    this.state = {
      companyImageLoading: true,
    };
  }

  campaignIcon = ({campaignType}: Campaign) => {
    switch (campaignType) {
      case CampaignType.Drink:
        return (
          <FastImage
            style={this.s.cardBodyItemIcon}
            resizeMode="contain"
            source={require('../../../assets/image/User/coffeeIcon.png')}
          />
        );
      case CampaignType.Meal:
        return (
          <FastImage
            style={this.s.cardBodyItemIcon}
            resizeMode="contain"
            source={require('../../../assets/image/User/mealIcon.png')}
          />
        );
      case CampaignType.Dessert:
        return (
          <FastImage
            style={this.s.cardBodyItemIcon}
            resizeMode="contain"
            source={require('../../../assets/image/User/dessertIcon.png')}
          />
        );
      default:
        return null;
    }
  };

  campaignCount = ({campaignType, actionCount}: Campaign, usersPinCount: number) => {
    const isCompleted = usersPinCount === actionCount;

    switch (campaignType) {
      case CampaignType.Drink:
        if (isCompleted) {
          return (
            <View style={[this.s.cardBodyItemCount, this.s.coffeeDoneBackground]}>
              <FastImage
                style={this.s.tick}
                resizeMode="contain"
                source={require('../../../assets/image/tickWhite.png')}
              />
            </View>
          );
        }
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>
              {usersPinCount}
            </Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>/</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>{actionCount}</Text>
          </View>
        );
      case CampaignType.Meal:
        if (isCompleted) {
          return (
            <View style={[this.s.cardBodyItemCount, this.s.mealDoneBackground]}>
              <FastImage
                style={this.s.tick}
                resizeMode="contain"
                source={require('../../../assets/image/tickWhite.png')}
              />
            </View>
          );
        }
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>{usersPinCount}</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>/</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>{actionCount}</Text>
          </View>
        );
      case CampaignType.Dessert:
        if (isCompleted) {
          return (
            <View style={[this.s.cardBodyItemCount, this.s.dessertDoneBackground]}>
              <FastImage
                style={this.s.tick}
                resizeMode="contain"
                source={require('../../../assets/image/tickWhite.png')}
              />
            </View>
          );
        }
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>
              {usersPinCount}
            </Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>/</Text>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>
              {actionCount}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  public render() {
    const {navigation, shouldHeaderHide, company} = this.props;
    const {companyImageLoading} = this.state;
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
                <FastImage
                  style={this.s.cardHeaderImage}
                  resizeMode="contain"
                  source={{
                    uri: company.companyLogo,
                    priority: 'high',
                  }}
                  onLoadStart={() => {
                    this.setState({companyImageLoading: true});
                  }}
                  onLoadEnd={() => {
                    this.setState({companyImageLoading: false});
                  }}>
                  <View style={this.s.loadingCenter}>
                    <ActivityIndicator animating={companyImageLoading} />
                  </View>
                </FastImage>
              </View>

              <Text style={this.s.cardHeaderText}>{company.companyName}</Text>

              <FastImage
                resizeMode="contain"
                style={this.s.headerArrow}
                source={require('../../../assets/image/User/arrow.png')}
              />
            </TouchableOpacity>
            <View style={this.s.line} />
          </View>
        )}
        <View style={this.s.cardBody}>
          {company.campaigns.map(campaign => {
            const activeCampaigns = toJS(UserStore.userDetails.activeCampaigns);
            let isUserJoinedThisCampaign: ActiveCampaign = null;
            isUserJoinedThisCampaign =
              activeCampaigns &&
              activeCampaigns.length &&
              activeCampaigns.find(activeCampaign => {
                return activeCampaign.campaignId === campaign.campaignId;
              });
            return (
              <TouchableOpacity
                key={Math.random() * 1000}
                style={this.s.cardBodyItem}
                onPress={() => {
                  CampaignDetailsStore.selectedCampaign = campaign;
                  CampaignDetailsStore.selectedCompany = company;
                  CampaignDetailsStore.selectedCampaignPinCount = isUserJoinedThisCampaign?.pinEarned
                    ? isUserJoinedThisCampaign?.pinEarned
                    : 0;
                  CampaignDetailsStore.campaignDetailsHalfModalRef.open();
                }}>
                {this.campaignIcon(campaign)}
                <Text style={this.s.cardBodyItemName}>{campaign.campaignName}</Text>
                {this.campaignCount(
                  campaign,
                  isUserJoinedThisCampaign ? isUserJoinedThisCampaign.pinEarned : 0,
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>
    );
  }
}
