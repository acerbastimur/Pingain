import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';

import { observer } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import NoCampaignStyle from './NoCampaign.style';
import Button from '../../../common-components/Button';
import Colors from '../../../styles/Colors';

export interface NoCampaignProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class NoCampaign extends React.Component<NoCampaignProps> {
  style = NoCampaignStyle;

  constructor(props: NoCampaignProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { navigation } = this.props;

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
          <FastImage
            resizeMode="contain"
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
              navigation.navigate('CampaignCreate', { edit: false });
            }}
          />
        </View>
      </View>
    );
  }
}
