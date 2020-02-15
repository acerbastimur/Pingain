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
import {View, Text} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import GivePrizeStyle from './GivePrize.style';
import CampaignType from '../../../../../schemes/company/CampaignType.enum';

export interface GivePrizeProps {
  campaignType: number;
  companyLogo: string;
  companyName: string;
  campaignName: string;
}

const campaignLogo = (campaignType: CampaignType) => {
  const style = GivePrizeStyle;
  switch (campaignType) {
    case CampaignType.Drink:
      return (
        <FastImage
          resizeMode="contain"
          style={style.cardBodyItemIcon}
          source={require('../../../../../assets/image/User/coffeeIcon.png')}
        />
      );

    case CampaignType.Meal:
      return (
        <FastImage
          resizeMode="contain"
          style={style.cardBodyItemIcon}
          source={require('../../../../../assets/image/User/mealIcon.png')}
        />
      );
    case CampaignType.Dessert:
      return (
        <FastImage
          resizeMode="contain"
          style={style.cardBodyItemIcon}
          source={require('../../../../../assets/image/User/dessertIcon.png')}
        />
      );

    default:
      return null;
  }
};

const campaignCount = (campaignType: CampaignType) => {
  const style = GivePrizeStyle;

  switch (campaignType) {
    case CampaignType.Drink:
      return (
        <Text style={[style.cardBodyItemCountText, style.cardItemPlus, style.cardItemPlusDrink]}>
          + 1
        </Text>
      );

    case CampaignType.Meal:
      return (
        <Text style={[style.cardBodyItemCountText, style.cardItemPlus, style.cardItemPlusMeal]}>
          + 1
        </Text>
      );

    case CampaignType.Dessert:
      return (
        <Text style={[style.cardBodyItemCountText, style.cardItemPlus, style.cardItemPlusDessert]}>
          + 1
        </Text>
      );

    default:
      return null;
  }
};
const GivePrize = ({campaignType, companyLogo, companyName, campaignName}: GivePrizeProps) => {
  const style = GivePrizeStyle;
  return (
    <View style={style.container}>
      <View style={style.swipeArea} />

      <View style={style.cardHeader}>
        <View style={style.cardHeaderImageContainer}>
          <FastImage
            resizeMode="contain"
            source={{uri: companyLogo, priority: 'high'}}
            style={style.cardHeaderImage}
          />
        </View>

        <Text style={style.cardHeaderText}>{companyName}</Text>
      </View>
      <View style={style.line} />
      <View style={style.cardBodyItem}>
        {campaignLogo(campaignType)}
        <Text style={style.cardBodyItemName}>{campaignName}</Text>
        <View style={style.cardBodyItemCount}>{campaignCount(campaignType)}</View>
      </View>
      <View style={style.line} />
      <View style={style.greetingContainer}>
        <Text style={style.greetingHeaderText}>Tebrikler Pingainer!</Text>
        <Text style={style.greetingText}>
          Yepyeni bir <Text style={style.textHighlight}>Pin</Text> kazandın!
        </Text>
        <Text style={style.greetingText}>Kampanyayı tamamla, Ödülü kazan!</Text>
        <Animatable.Image
          animation="bounceIn"
          duration={2000}
          useNativeDriver
          delay={500}
          source={require('../../../../../assets/image/winPin.png')}
          style={style.winImage}
        />
      </View>
    </View>
  );
};

export default GivePrize;
