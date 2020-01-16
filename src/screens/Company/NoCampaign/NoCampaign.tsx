/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import NoCampaignStyle from './NoCampaign.style';
import Button from '../../../common-components/Button';
import Colors from '../../../styles/Colors';

export interface NoCampaignProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class NoCampaign extends React.Component<NoCampaignProps, any> {
  style = NoCampaignStyle;

  constructor(props: NoCampaignProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;

    return (
      <View style={this.style.container}>
        <Text style={this.style.headerText}>Anasayfa</Text>
        <Text style={this.style.topTextLight}>
          Pingain Ailesine Hoşgeldin! {'\n'}
          İşletmeni adım adım
          <Text style={this.style.textHighlighted}> büyütmek</Text> ve müşterilerinin işletmene olan
          <Text style={this.style.textHighlighted}> bağlılığını arttırmak</Text> için başlayalım!
        </Text>
        <View style={this.style.imageContainer}>
          <Image
            style={this.style.image}
            source={require('../../../assets/image/Company/NoCampaignImage.png')}
          />
        </View>
        <View style={this.style.buttonContainer}>
          <Button
            text="Kampanya Oluştur"
            backgroundColor={Colors.COMPANY}
            shadow
            textColor="#fff"
            onPress={() => {
              navigation.navigate('CampaignCreate', {edit: false});
            }}
          />
        </View>
      </View>
    );
  }
}
