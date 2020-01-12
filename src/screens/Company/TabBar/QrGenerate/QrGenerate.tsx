/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Image, Text, FlatList, Dimensions} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import QrGenerateStyle from './QrGenerate.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import Colors from '../../../../styles/Colors';

export interface QrGenerateProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class QrGenerate extends React.Component<QrGenerateProps, any> {
  style = QrGenerateStyle;

  constructor(props: QrGenerateProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;
    const myJson = `{
  "itemNo":"dc607b66-31b8-45aa-af55-e5f5f3f2eab7",
  "companyNo":"e5f5f3f2eab7",
  "campaignNo":"45aa",
  "itemNo":"dc607b66-31b8-45aa-af55-e5f5f3f2eab7",
 
}`;
    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onLeftPress={() => {
              navigation.navigate('UserDetails');
            }}
          />
        </View>
        <View style={this.style.qrContainer}>
          <QRCode
            size={
              Dimensions.get('window').width > 350
                ? (Dimensions.get('window').width * 60) / 100
                : (Dimensions.get('window').width * 50) / 100
            }
            color={Colors.TEXT_HIGHLIGHTED}
            value={myJson}
            ecl="L"
          />
        </View>
        <View style={this.style.campaignsContainer}>
          <View style={this.style.campaignCardContainer}>
            <View style={[this.style.campaignCard, this.style.campaignCardCoffee]}>
              <Image
                style={this.style.campaignCardImg}
                source={require('../../../../assets/image/User/coffeeIcon.png')}
              />
              <Text style={this.style.campaignCardText}>Kahve</Text>
            </View>
          </View>
        </View>
        <Text style={this.style.bottomText}>Kampanya seçimi yaparak QR kodu uzatabilirsiniz.</Text>
      </View>
    );
  }
}
