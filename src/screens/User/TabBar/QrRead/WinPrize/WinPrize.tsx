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
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import QRCode from 'react-native-qrcode-svg';
import FastImage from 'react-native-fast-image';
import WinPrizeStyle from './WinPrize.style';
import Colors from '../../../../../styles/Colors';
import WinModalStore from '../../../../../stores/WinModal.store';
import CampaignType from '../../../../../schemes/company/CampaignType.enum';

export interface WinPrizeProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const campaignLogo = (campaignType: CampaignType) => {
  const style = WinPrizeStyle;
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

const WinPrize = ({navigation}) => {
  const style = WinPrizeStyle;
  const {campaignType, companyLogo, companyName, campaignName} = WinModalStore.winPrizeDetails;

  return (
    <View style={style.container}>
      <View style={style.swipeArea} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CompanyDetails');
        }}
        style={style.cardHeader}>
        <View style={style.cardHeaderImageContainer}>
          <FastImage
            resizeMode="contain"
            source={{uri: companyLogo, priority: 'high'}}
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
        <View style={style.cardBodyItemCount}>
          <FastImage
            resizeMode="contain"
            source={require('../../../../../assets/image/tick.png')}
            style={style.cardBodyDone}
          />
        </View>
      </View>
      <View style={style.line} />
      <View style={style.greetingContainer}>
        <Text style={style.greetingHeaderText}>Afiyet Olsun pingainer!</Text>
        <Text style={style.greetingText}>
          Yepyeni bir <Text style={style.textHighlight}>Ödül</Text> kazandın!
        </Text>
        <Text style={style.greetingText}>Başka bir kampanyada buluşalım...</Text>

        <View style={style.qrImageContainer}>
          <Animatable.Image
            animation="bounceIn"
            duration={2000}
            useNativeDriver
            delay={500}
            source={require('../../../../../assets/image/winPrize.png')}
            style={style.winImage}
          />
          <Animatable.View
            animation="bounceIn"
            duration={2300}
            style={style.qrImage}
            useNativeDriver
            delay={500}>
            <QRCode
              size={Dimensions.get('screen').width > 350 ? 100 : 70}
              color={Colors.PRIMARY}
              value="Umut"
              ecl="H"
            />
          </Animatable.View>
        </View>
      </View>
      <Text style={style.showQrText}>QR kodunu göstererek ödülünü alabilirsin.</Text>
    </View>
  );
};

export default WinPrize;
