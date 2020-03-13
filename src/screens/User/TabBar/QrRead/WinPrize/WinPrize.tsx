import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import QRCode from 'react-native-qrcode-svg';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import WinPrizeStyle from './WinPrize.style';
import Colors from '../../../../../global/styles/Colors';
import WinModalStore from '../../../../../stores/WinModal.store';
import CampaignType from '../../../../../schemes/company/CampaignType.enum';
import User from '../../../../../schemes/user/User';
import GetUserInfoService from '../../../../../services/user/General/GetUserInfo.service';

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

class WinPrize extends React.Component<WinPrizeProps> {
  removeCampaignSubscription: () => void = null;

  componentDidMount() {
    const { uid } = auth().currentUser;
    const { campaignId } = WinModalStore.winPrizeDetails;
    this.removeCampaignSubscription = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(async observer => {
        const userObserver = observer.data() as User;
        if (!userObserver?.activeCampaigns) return;
        const isCampaignExist = userObserver.activeCampaigns.find(
          campaign => campaign.campaignId === campaignId,
        );
        if (isCampaignExist) return;
        await GetUserInfoService.getUserInfo(); // update store if user gets him/her prize
        WinModalStore.isWinPrizeModalOpened = false;
      });
  }

  componentWillUnmount() {
    this.removeCampaignSubscription();
  }

  render() {
    const { navigation } = this.props;
    const style = WinPrizeStyle;
    const {
      campaignType,
      companyLogo,
      companyName,
      campaignName,
      giftCode,
      campaignId,
      company,
    } = WinModalStore.winPrizeDetails;
    const { uid } = auth().currentUser;
    const qrJson = { userId: uid, campaignId, scannedQrId: giftCode };

    return (
      <View style={style.container}>
        <View style={style.swipeArea} />

        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            WinModalStore.isWinPrizeModalOpened = false;
            setTimeout(() => {
              navigation.navigate('CompanyDetails', { company });
            }, 200);
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
          <Text style={style.greetingHeaderText}>Afiyet Olsun Pingainer!</Text>
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
              delay={500}
            >
              <QRCode
                size={Dimensions.get('screen').width > 350 ? 140 : 110}
                color={Colors.PRIMARY}
                value={JSON.stringify(qrJson)}
                ecl="H"
              />
            </Animatable.View>
          </View>
        </View>
        <Text style={style.showQrText}>QR kodunu göstererek ödülünü alabilirsin.</Text>
      </View>
    );
  }
}

export default WinPrize;
