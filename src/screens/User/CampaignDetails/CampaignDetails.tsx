/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

import Swiper from 'react-native-swiper';
import {Card} from 'react-native-shadow-cards';
import {NavigationScreenProp, NavigationState, NavigationParams, FlatList} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import CampaignDetailsStyle from './CampaignDetails.style';
import Colors from '../../../styles/Colors';
import Button from '../../../common-components/Button';
import CampaignDetailsModalStore from '../../../stores/CampaignDetailsModal.store';
import CampaignType from '../../../schemes/company/CampaignType.enum';
import UserStore from '../../../stores/User.store';

export interface CampaignDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Pin = ({completed, navigation}) => {
  const itemWidth = Dimensions.get('window').width / 8;
  if (completed) {
    return (
      <View
        style={{
          width: itemWidth,
          height: itemWidth,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <FastImage
          resizeMode="contain"
          style={{width: itemWidth, height: itemWidth}}
          source={require('../../../assets/image/pin_completed.png')}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('QrRead');
        CampaignDetailsModalStore.isCampaignDetailsModalOpen = false;
      }}
      style={{
        width: itemWidth,
        height: itemWidth,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
      <FastImage
        resizeMode="contain"
        style={{width: itemWidth, height: itemWidth}}
        source={require('../../../assets/image/pin_uncompleted.png')}
      />
    </TouchableOpacity>
  );
};

const campaignCount = ({campaignType, actionCount}, usersPinCount: number) => {
  const style = CampaignDetailsStyle;

  switch (campaignType) {
    case CampaignType.Drink:
      return (
        <View style={style.cardBodyItemCount}>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>{usersPinCount}</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>/</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>{actionCount}</Text>
        </View>
      );
    case CampaignType.Meal:
      return (
        <View style={style.cardBodyItemCount}>
          <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>{usersPinCount}</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>/</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>{actionCount}</Text>
        </View>
      );
    case CampaignType.Dessert:
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

const campaignIcon = ({campaignType}) => {
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

const CampaignDetails = ({navigation}: CampaignDetailsProps) => {
  const style = CampaignDetailsStyle;

  const {
    actionCount,
    campaignName,
    campaignType,
    campaignId,
  } = CampaignDetailsModalStore.selectedCampaign;
  const {companyName, campaigns} = CampaignDetailsModalStore.selectedCompany;
  const userPinCount = CampaignDetailsModalStore.selectedCampaignPinCount;
  return (
    <View style={style.container}>
      <View style={style.swipeArea} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CompanyDetails');
          CampaignDetailsModalStore.isCampaignDetailsModalOpen = false;
        }}
        style={style.cardHeader}>
        <View style={style.cardHeaderImageContainer}>
          <FastImage
            resizeMode="contain"
            source={require('../../../assets/image/User/cafeImageExample.png')}
            style={style.cardHeaderImage}
          />
        </View>

        <Text style={style.cardHeaderText}>{companyName}</Text>
        <FastImage
          resizeMode="contain"
          style={style.headerArrow}
          source={require('../../../assets/image/User/arrow.png')}
        />
      </TouchableOpacity>
      <View style={style.line} />
      <View style={style.cardBodyItem}>
        {campaignIcon({campaignType})}
        <Text style={style.cardBodyItemName}>{campaignName}</Text>

        {campaignCount({campaignType, actionCount}, userPinCount)}
      </View>
      <View style={style.line} />
      <View style={style.pinsContainer}>
        <View style={style.pinsFullLineContainer}>
          <FlatList
            data={Array.from({length: actionCount}, (v, k) => k + 1)}
            keyExtractor={(item, index) => String(index)}
            numColumns={5}
            renderItem={({index}) => {
              return (
                <View
                  style={{marginRight: (Dimensions.get('window').width / 100) * 4, marginTop: 25}}>
                  <Pin completed={userPinCount > index} navigation={navigation} />
                </View>
              );
            }}
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
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              nextButton={
                <FastImage
                  resizeMode="contain"
                  source={require('../../../assets/image/right.png')}
                  style={style.swipperButton}
                />
              }
              prevButton={
                <FastImage
                  resizeMode="contain"
                  source={require('../../../assets/image/left.png')}
                  style={style.swipperButton}
                />
              }>
              {campaigns.map(campaign => {
                const userpins =
                  UserStore.userDetails.activeCampaigns &&
                  UserStore.userDetails.activeCampaigns.find(
                    activeCampaign => activeCampaign.campaignId === campaign.campaignId,
                  );

                if (campaign.campaignId === campaignId) return null;
                return (
                  <Card key={Math.random() * 100} elevation={6} opacity={0.2} style={style.card}>
                    <View style={style.otherCardBodyItem}>
                      {campaignIcon({campaignType: campaign.campaignType})}

                      <Text style={style.otherCardBodyItemName}>{campaign.campaignName}</Text>
                      <View style={style.cardBodyItemCount}>
                        <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>
                          {(userpins && userpins.pinEarned) || 0}
                        </Text>
                        <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>/</Text>
                        <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>
                          {campaign.actionCount}
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
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
              text="Bağlantıyı kopyala"
              backgroundColor={Colors.INFO}
              textColor="#fff"
              shadow
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CampaignDetails;
