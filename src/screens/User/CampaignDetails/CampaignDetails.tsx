/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Linking, Platform } from 'react-native';

import Swiper from 'react-native-swiper';
import { Card } from 'react-native-shadow-cards';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  FlatList,
} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { toJS } from 'mobx';
import CampaignDetailsStyle from './CampaignDetails.style';
import Colors from '../../../global/styles/Colors';
import Button from '../../../common-components/Button';
import CampaignDetailsModalStore from '../../../stores/CampaignDetailsModal.store';
import CampaignType from '../../../schemes/company/CampaignType.enum';
import UserStore from '../../../stores/User.store';
import { ActiveCampaign } from '../../../schemes/user/User';
import WinModalStore from '../../../stores/WinModal.store';
import { Campaign } from '../../../schemes/user/UserCompany';

export interface CampaignDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Pin = ({ completed, navigation }) => {
  const itemWidth = Dimensions.get('window').width / 8;
  if (completed) {
    return (
      <View
        style={{
          width: itemWidth,
          height: itemWidth,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <FastImage
          resizeMode="contain"
          style={{ width: itemWidth, height: itemWidth }}
          source={require('../../../assets/image/pin_completed.png')}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      onPress={() => {
        navigation.navigate('QrRead');
        CampaignDetailsModalStore.isCampaignDetailsModalOpen = false;
      }}
      style={{
        width: itemWidth,
        height: itemWidth,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <FastImage
        resizeMode="contain"
        style={{ width: itemWidth, height: itemWidth }}
        source={require('../../../assets/image/pin_uncompleted.png')}
      />
    </TouchableOpacity>
  );
};

const campaignIcon = ({ campaignType }) => {
  const style = CampaignDetailsStyle;

  switch (campaignType) {
    case CampaignType.Drink:
      return (
        <FastImage
          resizeMode="contain"
          style={style.cardBodyItemIcon}
          source={require('../../../assets/image/User/coffeeIcon.png')}
        />
      );
    case CampaignType.Meal:
      return (
        <FastImage
          resizeMode="contain"
          style={style.cardBodyItemIcon}
          source={require('../../../assets/image/User/mealIcon.png')}
        />
      );
    case CampaignType.Dessert:
      return (
        <FastImage
          resizeMode="contain"
          style={style.cardBodyItemIcon}
          source={require('../../../assets/image/User/dessertIcon.png')}
        />
      );
    default:
      return (
        <FastImage
          resizeMode="contain"
          style={style.cardBodyItemIcon}
          source={require('../../../assets/image/User/coffeeIcon.png')}
        />
      );
  }
};
const campaignCount = ({ campaignType, actionCount }: Campaign, usersPinCount: number) => {
  const style = CampaignDetailsStyle;

  const isCompleted = usersPinCount === actionCount;

  switch (campaignType) {
    case CampaignType.Drink:
      if (isCompleted) {
        return (
          <View style={[style.cardBodyItemCount, style.coffeeDoneBackground]}>
            <FastImage
              style={style.tick}
              resizeMode="contain"
              source={require('../../../assets/image/tickWhite.png')}
            />
          </View>
        );
      }
      return (
        <View style={style.cardBodyItemCount}>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>{usersPinCount}</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>/</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>{actionCount}</Text>
        </View>
      );
    case CampaignType.Meal:
      if (isCompleted) {
        return (
          <View style={[style.cardBodyItemCount, style.mealDoneBackground]}>
            <FastImage
              style={style.tick}
              resizeMode="contain"
              source={require('../../../assets/image/tickWhite.png')}
            />
          </View>
        );
      }
      return (
        <View style={style.cardBodyItemCount}>
          <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>{usersPinCount}</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>/</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>{actionCount}</Text>
        </View>
      );
    case CampaignType.Dessert:
      if (isCompleted) {
        return (
          <View style={[style.cardBodyItemCount, style.dessertDoneBackground]}>
            <FastImage
              style={style.tick}
              resizeMode="contain"
              source={require('../../../assets/image/tickWhite.png')}
            />
          </View>
        );
      }
      return (
        <View style={style.cardBodyItemCount}>
          <Text style={[style.cardBodyItemCountText, style.cardItemDessert]}>{usersPinCount}</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemDessert]}>/</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemDessert]}>{actionCount}</Text>
        </View>
      );
    default:
      return null;
  }
};
const onOtherCampaignCardPress = (campaign: Campaign) => {
  CampaignDetailsModalStore.isCampaignDetailsModalOpen = false;
  const activeCampaigns = toJS(UserStore.userDetails.activeCampaigns);
  let isUserJoinedThisCampaign: ActiveCampaign = null;

  isUserJoinedThisCampaign =
    activeCampaigns &&
    activeCampaigns.length &&
    activeCampaigns.find(activeCampaign => activeCampaign.campaignId === campaign.campaignId);

  setTimeout(() => {
    const usersPinCount = isUserJoinedThisCampaign ? isUserJoinedThisCampaign.pinEarned : 0;
    const isCompleted = usersPinCount === campaign.actionCount;

    if (isCompleted) {
      const { giftCode } = UserStore.userDetails.activeCampaigns.find(
        activeCampaign => campaign.campaignId === activeCampaign.campaignId,
      );
      const company = toJS(UserStore.companies.find(cmp => cmp.companyId === campaign.companyId));

      WinModalStore.winPrizeDetails = {
        campaignType: campaign.campaignType,
        companyLogo: company.companyLogo,
        companyName: company.companyName,
        campaignName: campaign.campaignName,
        giftCode,
        campaignId: campaign.campaignId,
        company,
      };

      return setTimeout(() => {
        WinModalStore.isWinPrizeModalOpened = true;
      }, 200);
    }

    CampaignDetailsModalStore.selectedCampaign = campaign;
    CampaignDetailsModalStore.selectedCampaignPinCount = isUserJoinedThisCampaign?.pinEarned
      ? isUserJoinedThisCampaign?.pinEarned
      : 0;
    CampaignDetailsModalStore.isCampaignDetailsModalOpen = true;
    return null;
  }, 200);
};
const otherCampaigns = (campaigns: Campaign[], campaignId: string) =>
  campaigns
    .map(campaign => {
      const style = CampaignDetailsStyle;

      const userpins =
        UserStore.userDetails.activeCampaigns &&
        UserStore.userDetails.activeCampaigns.find(
          activeCampaign => activeCampaign.campaignId === campaign.campaignId,
        );

      if (campaign.campaignId === campaignId) return null;

      return (
        <Card key={Math.random() * 100} elevation={6} opacity={0.2} style={style.card}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={style.otherCardBodyItem}
            onPress={() => onOtherCampaignCardPress(campaign)}
          >
            {campaignIcon({ campaignType: campaign.campaignType })}

            <Text numberOfLines={1} ellipsizeMode="tail" style={style.otherCardBodyItemName}>
              {campaign.campaignName}
            </Text>
            {campaignCount(campaign, userpins ? userpins.pinEarned : 0)}
          </TouchableOpacity>
        </Card>
      );
    })
    .filter(e => e);

const CampaignDetails = ({ navigation }: CampaignDetailsProps) => {
  const style = CampaignDetailsStyle;

  const {
    actionCount,
    campaignName,
    campaignType,
    campaignId,
    companyId,
  } = CampaignDetailsModalStore.selectedCampaign;
  const { selectedCampaign } = CampaignDetailsModalStore;
  const { companyName, campaigns, companyLogo } = CampaignDetailsModalStore.selectedCompany;
  const userPinCount = CampaignDetailsModalStore.selectedCampaignPinCount;
  const currentCompany = UserStore.companies.find(company => company.companyId === companyId);

  return (
    <View style={style.container}>
      <View style={style.swipeArea} />

      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => {
          CampaignDetailsModalStore.isCampaignDetailsModalOpen = false;
          setTimeout(() => {
            navigation.navigate('CompanyDetails', { company: currentCompany });
          }, 200);
        }}
        style={style.cardHeader}
      >
        <View style={style.cardHeaderImageContainer}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: companyLogo }}
            style={style.cardHeaderImage}
          />
        </View>

        <Text numberOfLines={1} ellipsizeMode="tail" style={style.cardHeaderText}>
          {companyName}
        </Text>
        <FastImage
          resizeMode="contain"
          style={style.headerArrow}
          source={require('../../../assets/image/User/arrow.png')}
        />
      </TouchableOpacity>
      <View style={style.line} />
      <View style={style.cardBodyItem}>
        {campaignIcon({ campaignType })}
        <Text style={style.cardBodyItemName}>{campaignName}</Text>

        {campaignCount(selectedCampaign, userPinCount > 0 ? userPinCount : 0)}
      </View>
      <View style={style.line} />
      <View style={style.pinsContainer}>
        <View style={style.pinsFullLineContainer}>
          <FlatList
            data={Array.from({ length: actionCount }, (v, k) => k + 1)}
            keyExtractor={(item, index) => String(index)}
            numColumns={5}
            scrollEnabled={false}
            renderItem={({ index }) => (
              <View
                style={{ marginRight: (Dimensions.get('window').width / 100) * 4, marginTop: 25 }}
              >
                <Pin completed={userPinCount > index} navigation={navigation} />
              </View>
            )}
          />
        </View>
      </View>
      {campaigns.length > 1 ? (
        <View>
          <Text style={style.otherCampaignsHeaderText}>Bu işletmedeki diğer kampanyalar</Text>
          <View style={style.swiperContainer}>
            <Swiper
              showsPagination={false}
              showsButtons
              autoplay
              autoplayTimeout={2}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              nextButton={
                <Image
                  source={require('../../../assets/image/right.png')}
                  style={style.swipperButton}
                />
              }
              prevButton={
                <Image
                  source={require('../../../assets/image/left.png')}
                  style={style.swipperButton}
                />
              }
            >
              {otherCampaigns(campaigns, campaignId)}
            </Swiper>
          </View>
        </View>
      ) : (
        <View style={style.noOtherCampaignsContainer}>
          <Text style={style.otherCampaignsHeaderText}>Arkadaşlarına bizden bahset</Text>
          <Text style={style.shareUsText}>
            Bu veya diğer Pingain üyesi işletmelerin kampanyalarından
            <Text style={style.textHighlighted}> arkadaşlarına haber vermek </Text>ve büyümemize
            destek vermek için arkadaşlarını
            <Text style={style.textHighlighted}> Pingain’e davet etmek ister misin?</Text>
          </Text>
          <View style={style.shareButtonContainer}>
            <Button
              text="Davet Et"
              backgroundColor={Colors.INFO}
              textColor="#fff"
              shadow
              onPress={() => {
                const whatsappText = Platform.select({
                  android:
                    'Pingain adında bir uygulama keşfettim, gittiğim kafelerde topladığım pinler ile ücretsiz ikramlar alıyorum. Bir bak derim: \n https://',
                  ios:
                    'Pingain adında bir uygulama keşfettim, gittiğim kafelerde topladığım pinler ile ücretsiz ikramlar alıyorum. Bir bak derim:  \n https://',
                });
                Linking.openURL(`whatsapp://send?text=${whatsappText}`);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CampaignDetails;
