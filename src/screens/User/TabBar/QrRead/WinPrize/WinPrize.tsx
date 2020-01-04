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
import WinPrizeStyle from './WinPrize.style';
import Colors from '../../../../../styles/Colors';
import Button from '../../../../../common-components/Button';

export interface WinPrizeProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const WinPrize = ({navigation}) => {
  const style = WinPrizeStyle;
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
          <Image
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
          <Animatable.Image
            animation="bounceIn"
            duration={2000}
            useNativeDriver
            delay={500}
            source={require('../../../../../assets/image/qrExample.png')}
            style={style.qrImage}
          />
        </View>
      </View>
      <Text style={style.showQrText}>QR kodunu göstererek ödülünü alabilirsin.</Text>
    </View>
  );
};

export default WinPrize;
