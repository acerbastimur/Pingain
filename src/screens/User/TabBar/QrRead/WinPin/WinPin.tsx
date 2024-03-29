import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import WinPinStyle from './WinPin.style';
import WinModalStore from '../../../../../stores/WinModal.store';
import CampaignType from '../../../../../schemes/company/CampaignType.enum';
import UserStore from '../../../../../stores/User.store';

export interface WinPinProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const campaignLogo = (campaignType: CampaignType) => {
  const style = WinPinStyle;
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
  const style = WinPinStyle;

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
const WinPin = ({ navigation }: WinPinProps) => {
  const style = WinPinStyle;
  const {
    campaignType,
    companyLogo,
    companyName,
    campaignName,
    companyId,
  } = WinModalStore.getPinDetails;
  const company = UserStore.companies.find(_company => _company.companyId === companyId);
  return (
    <View style={style.container}>
      <View style={style.swipeArea} />

      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => {
          WinModalStore.isGetPinModalOpened = false;
          setTimeout(() => {
            navigation.navigate('CompanyDetails', { company });
          }, 500);
        }}
        style={style.cardHeader}
      >
        <View style={style.cardHeaderImageContainer}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: companyLogo, priority: 'high' }}
            style={style.cardHeaderImage}
          />
        </View>

        <Text style={style.cardHeaderText}>{companyName}</Text>

        <FastImage
          resizeMode="contain"
          style={style.headerArrow}
          source={require('../../../../../assets/image/User/arrow.png')}
        />
      </TouchableOpacity>
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

export default WinPin;
