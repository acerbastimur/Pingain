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
import {View, ScrollView, Image, Text, TouchableOpacity, Dimensions} from 'react-native';

import Swiper from 'react-native-swiper';
import {Card} from 'react-native-shadow-cards';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import CampaignDetailsStyle from './CampaignDetails.style';
import TabsHeader from '../../../../../common-components/TabsHeader';
import Colors from '../../../../../styles/Colors';
import CompanyCard from '../CompanyCard';
import Logo from '../../../../../common-components/Logo';

export interface CampaignDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface CampaignDetailsState {}

const CampaignDetails = ({navigation}) => {
  const style = CampaignDetailsStyle;

  const Pin = ({completed}) => {
    const itemWidth = Dimensions.get('window').width / 8;
    return (
      <View
        style={{
          width: itemWidth,
          height: itemWidth,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <Image
          style={{width: itemWidth, height: itemWidth, resizeMode: 'contain'}}
          source={
            completed
              ? require('../../../../../assets/image/pin_completed.png')
              : require('../../../../../assets/image/pin_uncompleted.png')
          }
        />
      </View>
    );
  };
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CompanyDetails');
        }}
        style={style.cardHeader}>
        <View style={style.cardHeaderImageContainer}>
          <Image
            source={require('../../../../../assets/image/User/cafeImageExample.png')}
            style={style.cardHeaderImage}
          />
        </View>

        <Text style={style.cardHeaderText}>Cafe Rien</Text>
        <Image
          style={style.headerArrow}
          source={require('../../../../../assets/image/User/arrow.png')}
        />
      </TouchableOpacity>
      <View style={style.line} />
      <View style={style.cardBodyItem}>
        <Image
          style={style.cardBodyItemIcon}
          source={require('../../../../../assets/image/User/coffeeIcon.png')}
        />
        <Text style={style.cardBodyItemName}>Filtre Kahve Kampanyası</Text>
        <View style={style.cardBodyItemCount}>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>2</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>/</Text>
          <Text style={[style.cardBodyItemCountText, style.cardItemCoffee]}>6</Text>
        </View>
      </View>
      <View style={style.line} />
      <View style={style.pinsContainer}>
        <View style={style.pinsLineContainer}>
          <Pin completed />
          <Pin completed />
          <Pin completed />
          <Pin completed />
          <Pin completed />
        </View>
        <View style={style.pinsLineContainer}>
          <Pin completed />
          <Pin completed />
          <Pin completed />
          <Pin completed={false} />
          <Pin completed={false} />
        </View>
      </View>

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
            <Image
              source={require('../../../../../assets/image/right.png')}
              style={{width: 20, resizeMode: 'contain'}}
            />
          }
          prevButton={
            <Image
              source={require('../../../../../assets/image/left.png')}
              style={{width: 20, resizeMode: 'contain'}}
            />
          }>
          <Card elevation={6} opacity={0.15} style={style.card}>
            <View style={style.otherCardBodyItem}>
              <Image
                style={style.cardBodyItemIcon}
                source={require('../../../../../assets/image/User/mealIcon.png')}
              />
              <Text style={style.otherCardBodyItemName}>Makarna Kampanyası</Text>
              <View style={style.cardBodyItemCount}>
                <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>5</Text>
                <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>/</Text>
                <Text style={[style.cardBodyItemCountText, style.cardItemMeal]}>7</Text>
              </View>
            </View>
          </Card>
          <Card elevation={6} opacity={0.15} style={style.card}>
            <View style={style.otherCardBodyItem}>
              <Image
                style={style.cardBodyItemIcon}
                source={require('../../../../../assets/image/User/mealIcon.png')}
              />
              <Text style={style.otherCardBodyItemName}>Cheesecake Kampanyası</Text>
              <View style={style.cardBodyItemCount}>
                <Text style={[style.cardBodyItemCountText, style.cardItemDessert]}>5</Text>
                <Text style={[style.cardBodyItemCountText, style.cardItemDessert]}>/</Text>
                <Text style={[style.cardBodyItemCountText, style.cardItemDessert]}>7</Text>
              </View>
            </View>
          </Card>
        </Swiper>
      </View>
    </View>
  );
};

export default CampaignDetails;
