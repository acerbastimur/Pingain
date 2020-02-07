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
import * as Animatable from 'react-native-animatable';
import WinPinStyle from './WinPin.style';
import Colors from '../../../../../styles/Colors';
import Button from '../../../../../common-components/Button';
import {UserCompany, Campaign} from '../../../../../schemes/user/UserCompany';
import WinModalStore from '../../../../../stores/WinModal.store';

export interface WinPinProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const WinPin = ({navigation}: WinPinProps) => {
  const style = WinPinStyle;
  const {campaignType, companyLogo, companyName, campaignName} = WinModalStore.getPinDetails;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CompanyDetails');
        }}
        style={style.cardHeader}>
        <View style={style.cardHeaderImageContainer}>
          <Image source={{uri: companyLogo}} style={style.cardHeaderImage} />
        </View>

        <Text style={style.cardHeaderText}>{companyName}</Text>
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
        <Text style={style.cardBodyItemName}>{campaignName}</Text>
        <View style={style.cardBodyItemCount}>
          <Text style={[style.cardBodyItemCountText, style.cardItemPlus]}>+ 1</Text>
        </View>
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
