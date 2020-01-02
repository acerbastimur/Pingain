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
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';

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

  const Pin = ({completed}) => (
    <View
      style={{
        width: 45,
        height: 45,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 20,
        marginBottom: 20,
      }}>
      <Image
        style={{width: 45, height: 45, resizeMode: 'contain'}}
        source={
          completed
            ? require('../../../../../assets/image/pin_completed.png')
            : require('../../../../../assets/image/pin_uncompleted.png')
        }
      />
    </View>
  );
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
        <Pin completed />
        <Pin completed />
        <Pin completed />
        <Pin completed={false} />
      </View>
      <Text style={style.otherCampaignsHeaderText}>Cafe Rien’deki diğer kampanyalar</Text>
      <View style={style.swiperContainer}>
        <Swiper
          showsPagination={false}
          showsButtons
          nextButton={(
            <Image
              source={require('../../../../../assets/image/right.png')}
              style={{width: 20, resizeMode: 'contain'}}
            />
          )}
          prevButton={(
            <Image
              source={require('../../../../../assets/image/left.png')}
              style={{width: 20, resizeMode: 'contain'}}
            />
          )}>
          <Card elevation={6} opacity={0.15} style={style.card}>
            <Text>sa</Text>
          </Card>
          <Card elevation={6} opacity={0.15} style={style.card}>
            <Text>sa</Text>
          </Card>
        </Swiper>
      </View>
    </View>
  );
};

export default CampaignDetails;
