import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import FastImage from 'react-native-fast-image';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import CompanyCardStyle from './CompanyCard.style';
import CampaignDetailsStore from '../../../stores/CampaignDetailsModal.store';
import { UserCompany, Campaign } from '../../../schemes/user/UserCompany';
import CampaignType from '../../../schemes/company/CampaignType.enum';
import { ActiveCampaign } from '../../../schemes/user/User';
import UserStore from '../../../stores/User.store';
import WinModalStore from '../../../stores/WinModal.store';

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

  campaignIcon = ({ campaignType }: Campaign) => {
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

  campaignCount = ({ campaignType, actionCount }: Campaign, usersPinCount: number) => {
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
    const { navigation, shouldHeaderHide, company } = this.props;
    const { companyImageLoading } = this.state;
    return (
      <Card elevation={6} opacity={0.15} style={this.s.card}>
        {!shouldHeaderHide && (
          <View>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
              onPress={() => {
                analytics().logEvent('press_companyCard_header', {
                  uid: auth().currentUser.uid,
                  companyId: company.companyId,
                });
                analytics().logEvent(`company_${company.companyId}_opened`, {
                  uid: auth().currentUser.uid,
                });
                navigation.navigate('CompanyDetails', { company });
              }}
              style={this.s.cardHeader}
            >
              <View style={this.s.cardHeaderImageContainer}>
                <FastImage
                  style={this.s.cardHeaderImage}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: company.companyLogo,
                    priority: 'high',
                  }}
                  onLoadStart={() => {
                    this.setState({ companyImageLoading: true });
                  }}
                  onLoadEnd={() => {
                    this.setState({ companyImageLoading: false });
                  }}
                >
                  <View style={this.s.loadingCenter}>
                    <ActivityIndicator animating={companyImageLoading} />
                  </View>
                </FastImage>
              </View>

              <Text style={this.s.cardHeaderText} numberOfLines={1} ellipsizeMode="tail">
                {company.companyName}
              </Text>

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
          {company.campaigns &&
            company.campaigns.map(campaign => {
              const activeCampaigns = toJS(UserStore.userDetails.activeCampaigns);
              let isUserJoinedThisCampaign: ActiveCampaign = null;
              isUserJoinedThisCampaign =
                activeCampaigns &&
                activeCampaigns.length &&
                activeCampaigns.find(
                  activeCampaign => activeCampaign.campaignId === campaign.campaignId,
                );
              return (
                <TouchableOpacity
                  key={Math.random() * 1000}
                  style={this.s.cardBodyItem}
                  hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
                  onPress={() => {
                    const usersPinCount = isUserJoinedThisCampaign
                      ? isUserJoinedThisCampaign.pinEarned
                      : 0;
                    const isCompleted = usersPinCount === campaign.actionCount;

                    analytics().logEvent('press_companyCard_campaign', {
                      uid: auth().currentUser.uid,
                      companyId: campaign.companyId,
                      campaignId: campaign.campaignId,
                      isCampaignDone: isCompleted,
                    });
                    analytics().logEvent(`campaign_${campaign.campaignId}_opened`, {
                      uid: auth().currentUser.uid,
                      companyId: campaign.companyId,
                      campaignId: campaign.campaignId,
                    });
                    if (isCompleted) {
                      const { giftCode } = UserStore.userDetails.activeCampaigns.find(
                        activeCampaign => campaign.campaignId === activeCampaign.campaignId,
                      );
                      WinModalStore.winPrizeDetails = {
                        campaignType: campaign.campaignType,
                        companyLogo: company.companyLogo,
                        companyName: company.companyName,
                        campaignName: campaign.campaignName,
                        giftCode,
                        campaignId: campaign.campaignId,
                        company,
                      };

                      WinModalStore.isWinPrizeModalOpened = true;
                      return;
                    }
                    CampaignDetailsStore.selectedCampaign = campaign;
                    CampaignDetailsStore.selectedCompany = company;
                    CampaignDetailsStore.selectedCampaignPinCount = isUserJoinedThisCampaign?.pinEarned
                      ? isUserJoinedThisCampaign?.pinEarned
                      : 0;
                    CampaignDetailsStore.isCampaignDetailsModalOpen = true;
                  }}
                >
                  {this.campaignIcon(campaign)}
                  <Text style={this.s.cardBodyItemName} numberOfLines={1} ellipsizeMode="tail">
                    {campaign.campaignName}
                  </Text>
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
