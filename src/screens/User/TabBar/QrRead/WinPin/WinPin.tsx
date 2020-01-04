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

export interface WinPinProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const WinPin = ({navigation}) => {
  const style = WinPinStyle;
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
          source={require('../../../../../assets/image/win.png')}
          style={style.winImage}
        />
      </View>
    </View>
  );
};

export default WinPin;
